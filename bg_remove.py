import sys
import subprocess
try:
    import rembg
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "onnxruntime"])
    import rembg
from PIL import Image
import os

files = ["gen_s_class.png", "gen_e_class.png", "gen_v_class.png", "gen_audi_a6.png"]
for file in files:
    input_path = "assets/" + file
    # Replace old files directly or create transparent_ versions
    output_path = "assets/transparent_" + file
    try:
        with open(input_path, 'rb') as i:
            input_data = i.read()
            output_data = rembg.remove(input_data)
        with open(output_path, 'wb') as o:
            o.write(output_data)
        print(f"Successfully processed {file}")
    except Exception as e:
        print(f"Failed {file}: {e}")
