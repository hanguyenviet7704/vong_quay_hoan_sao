from PIL import Image
import os

def remove_light_background_aggressive(input_path, output_path):
    """Aggressively remove white/light gray background including all light pixels"""
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        width, height = img.size

        newData = []
        for item in datas:
            r, g, b, a = item
            
            # Calculate brightness (average of RGB)
            brightness = (r + g + b) / 3
            
            # Check if pixel is light colored (white, light gray, or near-white)
            # Also check if it's a "grayish" pixel (low color saturation + high brightness)
            max_rgb = max(r, g, b)
            min_rgb = min(r, g, b)
            saturation = max_rgb - min_rgb
            
            # Remove if:
            # 1. Very bright (brightness > 200)
            # 2. Low saturation (grayish) AND somewhat bright
            if brightness > 200:
                newData.append((255, 255, 255, 0))  # Fully transparent
            elif brightness > 180 and saturation < 30:
                newData.append((255, 255, 255, 0))  # Also transparent (gray pixels)
            elif brightness > 160 and saturation < 20:
                newData.append((255, 255, 255, 0))  # Very low saturation grays
            else:
                newData.append(item)

        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully cleaned background from {input_path}")
        print(f"Saved to {output_path}")
    except Exception as e:
        print(f"Error processing image: {e}")

# Re-download original and process
# First, let's copy the original again
source_file = "C:/Users/hanguyenviet/.gemini/antigravity/brain/994f0b1b-282a-47c2-8b60-42b60a1acd08/media__1770346828005.png"
output_file = "dragon_pointer.png"

if os.path.exists(source_file):
    remove_light_background_aggressive(source_file, output_file)
else:
    # Try with existing file
    if os.path.exists(output_file):
        # Make a backup first
        img = Image.open(output_file)
        remove_light_background_aggressive(output_file, output_file)
    else:
        print("No source file found!")
