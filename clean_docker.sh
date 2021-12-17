#!/bin/bash
sudo docker kill $(sudo docker ps -q)
sudo docker-compose stop
sudo docker system prune -a