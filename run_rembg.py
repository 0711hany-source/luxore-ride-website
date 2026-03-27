import sys
import subprocess

subprocess.check_call([sys.executable, "-m", "pip", "install", "rembg", "onnxruntime", "numpy", "pillow", "pillow_heif", "opencv-python-headless"], stdout=subprocess.DEVNULL)
import rembg
from PIL import Image

for file in ["gen_s_class.png", "gen_e_class.png", "gen_v_class.png", "gen_audi_a6.png"]:
    in_path = "assets/" + file
    out_path = "assets/transparent_" + file
    try:
        with open(in_path, 'rb') as i:
            with open(out_path, 'wb') as o:
                o.write(rembg.remove(i.read()))
        print("Success:", out_path)
    except Exception as e:
        print("Error:", file, e)
