import json
from flask import Flask, request, jsonify
from curl_cffi import requests

app = Flask(__name__)

@app.route('/proxy', methods=['POST'])
def proxy():
    data = request.json
    url = data.get('url')
    method = data.get('method', 'GET')
    headers = data.get('headers', {})
    payload = data.get('data')

    try:
        # Nettoyage et ajout de headers "Humains" très stricts
        clean_headers = {k: v for k, v in headers.items() if v}
        
        # Headers additionnels typiques d'un vrai navigateur
        if "User-Agent" not in clean_headers:
            clean_headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
        if "Accept" not in clean_headers:
            clean_headers["Accept"] = "*/*"
        if "Accept-Language" not in clean_headers:
            clean_headers["Accept-Language"] = "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7"

        print(f"🕵️ [Anti-Bot] {method} {url}")

        # La magie de curl_cffi: impersonate va parfaire l'usurpation TLS de Chrome 110!
        response = requests.request(
            method=method,
            url=url,
            headers=clean_headers,
            json=payload if payload and method != "GET" else None,
            timeout=15,
            impersonate="chrome110"
        )
        
        try:
            return jsonify(response.json()), response.status_code
        except:
            return response.text, response.status_code
            
    except Exception as e:
        import traceback
        print(f"!!! Erreur fatale du proxy : {e}")
        traceback.print_exc()
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

if __name__ == '__main__':
    # On lance sur un nouveau port discret
    app.run(port=5556)
