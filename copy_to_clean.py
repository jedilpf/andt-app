import os
import shutil

src = r"c:\Users\21389\Downloads\andt1\12259"
dst = r"c:\Users\21389\Downloads\andt1\andt-app-clean"

exclude = ['.git', '【归档】冷数据_非必要不启用']

for item in os.listdir(src):
    s = os.path.join(src, item)
    d = os.path.join(dst, item)
    
    if item in exclude:
        print(f"跳过: {item}")
        continue
    
    if os.path.isdir(s):
        shutil.copytree(s, d)
        print(f"复制目录: {item}")
    else:
        shutil.copy2(s, d)
        print(f"复制文件: {item}")

print("\n完成!")
