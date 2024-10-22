

up:
	docker compose up
build:
	docker compose up --build
down:
	docker compose down || true
todos:
	docker-compose restart todos
volumes: down
	docker volume prune -f || true

prune: down volumes
	docker system prune -af || true

re: prune build