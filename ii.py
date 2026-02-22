import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_fluxer_user_info(token: str):
    """
    Récupère les informations du profil Fluxer lié au token.
    """
    url = "https://api.fluxer.app/v1/users/@me"
    
    # Pour un token utilisateur (selfbot), on ne met pas de préfixe comme "Bot " ou "Bearer "
    headers = {
        "Authorization": token
    }
    
    try:
        # Envoi de la requête GET
        response = requests.get(url, headers=headers)
        
        # Si la requête réussit (Code HTTP 200)
        if response.status_code == 200:
            user_data = response.json()
            print("✅ Informations récupérées avec succès :\n")
            print(f"ID         : {user_data.get('id')}")
            print(f"Username   : {user_data.get('username')}")
            print(f"Email      : {user_data.get('email', 'Non renseigné / Privé')}")
            print(f"Bot ?      : {'Oui' if user_data.get('bot') else 'Non'}")
            print(f"Vérifié ?  : {'Oui' if user_data.get('verified') else 'Non'}")
            
            return user_data
            
        # Si le token est invalide (Code HTTP 401)
        elif response.status_code == 401:
            print("❌ Erreur 401 : Le token est invalide, révoqué ou expiré.")
            
        # Autres erreurs (Rate limit, serveur down...)
        else:
            print(f"❌ Erreur {response.status_code} : {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Erreur de connexion à l'API Fluxer : {e}")

# ⚠️ Ne laisse jamais un token en dur dans un vrai script de production !
TON_TOKEN = os.environ.get("FLUXER_TOKEN")

if __name__ == "__main__":
    if TON_TOKEN:
        get_fluxer_user_info(TON_TOKEN)
    else:
        print("❌ ERREUR : FLUXER_TOKEN manquant dans .env")