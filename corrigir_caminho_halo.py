from pathlib import Path
import json
p = Path("content/publicados/halo-studios-30-funcionarios-ultima-missao-campaign-evolved-activision.json")
if not p.is_file():
    raise SystemExit("Execute este script na raiz do repositorio acerto-games.")
data=json.loads(p.read_text(encoding="utf-8"))
data["image"]="/halo-studios-campaign-evolved-capa.jpg"
p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print("Caminho da capa corrigido:",data["image"])
