
# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the static content (HTML, CSS, JS) into the Nginx web server directory
COPY ./app /usr/share/nginx/html

# Expose port 80 to allow incoming traffic
EXPOSE 80

# The command to start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
