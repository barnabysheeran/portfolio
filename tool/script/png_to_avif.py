import os
from PIL import Image

# Set input and output directories
input_dir = './src/assets'  # Adjust to your PNG folder
output_dir = './dist/assets'  # Adjust to your output folder

os.makedirs(output_dir, exist_ok=True)

for filename in os.listdir(input_dir):
    if filename.lower().endswith('.png'):
        input_path = os.path.join(input_dir, filename)
        output_filename = os.path.splitext(filename)[0] + '.avif'
        output_path = os.path.join(output_dir, output_filename)
        
        try:
            with Image.open(input_path) as img:
                # Convert to RGB if necessary (AVIF supports RGB)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                # Save as AVIF with optimization
                img.save(output_path, 'AVIF', quality=80, optimize=True)
                print(f"Converted {filename} to {output_filename}")
        except Exception as e:
            print(f"Error converting {filename}: {e}")

print("Conversion complete.")