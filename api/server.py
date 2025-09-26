import os
from http.server import HTTPServer

from api.regenerate import handler


def main() -> None:
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", "5000"))
    httpd = HTTPServer((host, port), handler)
    print(f"[API] Serving regenerate endpoint at http://{host}:{port}/api/regenerate")
    print("[API] Ensure GEMINI_API_KEY is set in your environment for AI features.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[API] Shutting down server...")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()


