import os
from PIL import Image

# Set the root directory to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = script_dir

# Walk through all subfolders of the root directory
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.lower().endswith('.png'):
            input_path = os.path.join(dirpath, filename)
            
            # Create new subfolder next to the original by duplicating and adding '_avif'
            if dirpath == root_dir:
                # For root directory, create 'root_avif' in root
                output_subdir = os.path.join(root_dir, 'root_avif')
            else:
                parent_dir = os.path.dirname(dirpath)
                base_name = os.path.basename(dirpath)
                new_folder_name = base_name + '_avif'
                output_subdir = os.path.join(parent_dir, new_folder_name)
            
            os.makedirs(output_subdir, exist_ok=True)
            
            output_filename = os.path.splitext(filename)[0] + '.avif'
            output_path = os.path.join(output_subdir, output_filename)
            
            try:
                with Image.open(input_path) as img:
                    # Convert to RGB if necessary (AVIF supports RGB)
                    if img.mode != 'RGB':
                        img = img.convert('RGB')
                    # Save as AVIF with optimization
                    img.save(output_path, 'AVIF', quality=80, optimize=True)
                    print(f"Converted {input_path} to {output_path}")
            except Exception as e:
                print(f"Error converting {input_path}: {e}")

print("Conversion complete.")