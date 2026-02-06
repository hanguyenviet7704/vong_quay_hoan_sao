from PIL import Image
import os

def remove_checkerboard_or_light_bg(input_path):
    """
    Attempts to remove checkerboard patterns or light backgrounds.
    Aggrresive mode: target common checkerboard grays and whites.
    """
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            r, g, b, a = item
            
            # Brightness
            brightness = (r + g + b) / 3.0
            
            # Saturation (Difference between max and min channel)
            saturation = max(r, g, b) - min(r, g, b)
            
            is_transparent = False

            # 1. White / Light
            if brightness > 210:
                is_transparent = True
            
            # 2. Common Transparency Grays (often around 204 or #CCCCCC, 192 or #C0C0C0)
            # We catch anything gray-ish that is lighter than dark gray
            elif brightness > 150 and saturation < 25:
                 is_transparent = True

            # 3. Specific check for "checkerboard gray" which is usually strictly neutral
            elif saturation < 10 and brightness > 120:
                # To avoid deleting black/dark gray objects, we keep > 120
                is_transparent = True

            if is_transparent:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)

        img.putdata(newData)
        # Save back to same path
        img.save(input_path, "PNG")
        print(f"Processed: {input_path}")
        
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
