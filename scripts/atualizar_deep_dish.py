from pathlib import Path
import json

raiz = Path(__file__).resolve().parent.parent
arquivo = raiz / 'content/publicados/deep-dish-dungeon-jogo-brasileiro-game-pass-lancamento-13-outubro.json'
if not arquivo.exists():
    raise SystemExit('ERRO: extraia este ZIP na raiz do repositório acerto-games, sobre os arquivos existentes.')
dados = json.loads(arquivo.read_text(encoding='utf-8'))
dados['image'] = '/img/deep-dish-dungeon-behold-studios-keyart.jpg'
dados['imageFilename'] = 'deep-dish-dungeon-behold-studios-keyart.jpg'
dados['imageAlt'] = 'Aventureiro com tocha explora masmorra escura em arte oficial de Deep Dish Dungeon da Behold Studios'
dados['imagePos'] = 'center center'
dados['imageCredit'] = 'Behold Studios / Raw Fury / Divulgação'
trailer = 'https://www.youtube.com/watch?v=F32DqJa9TYo'
corpo = dados.get('body', [])
corpo = [trailer if isinstance(x,str) and ('youtube.com/watch?v=' in x or 'youtu.be/' in x) else x for x in corpo]
if trailer not in corpo:
    corpo += ['## Assista ao trailer oficial de anúncio da data de lançamento',trailer]
dados['body'] = corpo
arquivo.write_text(json.dumps(dados,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('OK: capa e trailer atualizados em', arquivo)
