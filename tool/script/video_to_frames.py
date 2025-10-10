import os
import cv2

# Set input folder to the script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
input_folder = script_dir

# Get all video files (adjust extensions as needed: .mp4, .avi, etc.)
video_extensions = ('.mp4', '.avi', '.mov')  # Add more if needed

for filename in os.listdir(input_folder):
    if filename.lower().endswith(video_extensions):
        video_path = os.path.join(input_folder, filename)
        base_name = os.path.splitext(filename)[0]
        
        # Create a subfolder for this video's frames
        video_output_folder = os.path.join(input_folder, base_name)
        os.makedirs(video_output_folder, exist_ok=True)
        
        cap = cv2.VideoCapture(video_path)
        frame_count = 0
        
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frame_filename = f"{base_name}_{frame_count:04d}.png"
            cv2.imwrite(os.path.join(video_output_folder, frame_filename), frame)
            frame_count += 1
        
        cap.release()

print("Frame extraction complete.")