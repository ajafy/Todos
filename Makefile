

build:
	docker compose up --build -d
up:
	docker compose up -d
down:
	docker compose down || true
restart:
	docker-compose restart todos
volumes: down
	docker volume prune -f || true

prune: down volumes
	docker system prune -af || true

re: prune build