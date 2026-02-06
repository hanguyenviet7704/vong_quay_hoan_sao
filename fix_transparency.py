from PIL import Image
import os

def remove_checkerboard_or_light_bg(input_path):
    """
    Uses flood-fill from corners to make background transparent.
    This works best if the object is in the center and not touching edges.
    """
    try:
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Get corner colors to sample background
        corners = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        # Helper to check if pixel is similar to seed
        def is_similar(p1, p2, threshold=40):
            return abs(p1[0] - p2[0]) < threshold and \
                   abs(p1[1] - p2[1]) < threshold and \
                   abs(p1[2] - p2[2]) < threshold

        # BFS Flood Fill
        pixels = img.load()
        visited = set()
        
        # Start from all corners that look "background-ish" 
        # (Assuming background is not completely black 0,0,0 unless it's just black BG)
        queue = []
        for c in corners:
            queue.append(c)
            visited.add(c)
            
        # We need a reference color from the first corner
        # Adjust: Treat top-left corner as the definition of "background"
        seed_color = pixels[0, 0]
        
        queue = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        processed_img = img.copy()
        proc_pixels = processed_img.load()
        
        # To be safe, let's just make the "filled" pixels transparent
        # We use a custom flood fill because ImageDraw.floodfill doesn't support tolerance easily with RGBA transparency target
        
        # Actually, simpler approach:
        # If the background is a checkerboard, it has TWO colors. Flood fill might get stuck on one color.
        # But usually checkerboards are small grids.
        
        # Let's try the aggressive threshold again but specifically for DARK grays?
        # The user image showed a dark checkerboard.
        
        # HYBRID APPROACH:
        # 1. Convert to transparent ANY pixel that looks like the corner pixels (with tolerance)
        # 2. Iterate through all pixels.
        
        datas = img.getdata()
        newData = []
        
        # Sample top-left 10x10 area to find "background colors"
        bg_colors = set()
        for x in range(min(20, width)):
            for y in range(min(20, height)):
                bg_colors.add(pixels[x, y])
                
        # Also sample other corners
        for x in range(max(0, width-20), width):
            for y in range(max(0, height-20), height):
                bg_colors.add(pixels[x, y])

        # Define function to check against sampled bg colors
        def is_bg(pixel):
            r, g, b, a = pixel
            # Checkerboards are usually gray. R~G~B
            if abs(r-g) > 20 or abs(g-b) > 20: return False # Colorful = fail (preserve object)
            
            # Check against sampled set with tolerance
            for bg in bg_colors:
                br, bg_green, bb, ba = bg
                if abs(r - br) < 30 and abs(g - bg_green) < 30 and abs(b - bb) < 30:
                    return True
            return False

        for item in datas:
            if is_bg(item):
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        processed_img.putdata(newData)
        processed_img.save(input_path, "PNG")
        print(f"Processed (corner sampling): {input_path}")
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

images_to_fix = [
    "oil_bottle_gold.png",
    "smart_key_fob.png",
    "vinfast_vf3.png",
    "vinfast_scooter.png",
    "red_envelope.png",
    "gift_combo.png" 
]

for img_name in images_to_fix:
    if os.path.exists(img_name):
        remove_checkerboard_or_light_bg(img_name)
    else:
        print(f"Skipping {img_name} (not found)")
