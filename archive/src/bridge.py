import requests
import json
import sys

def main():
    if len(sys.argv) < 4:
        print(json.dumps({"error": "Missing arguments"}))
        return

    url = sys.argv[1]
    method = sys.argv[2]
    token = sys.argv[3]
    body_str = sys.argv[4] if len(sys.argv) > 4 else None

    headers = {
        "Authorization": token
    }

    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method.upper() == "POST":
            response = requests.post(url, headers=headers, data=body_str, timeout=10)
        elif method.upper() == "PATCH":
            response = requests.patch(url, headers=headers, data=body_str, timeout=10)
        elif method.upper() == "DELETE":
            response = requests.delete(url, headers=headers, timeout=10)
        else:
            print(json.dumps({"error": f"Unsupported method: {method}"}))
            return

        print(response.text)
    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    main()
