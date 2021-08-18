FROM node:14-alpine
WORKDIR /Users/decagon/week-7-task
COPY . /Users/decagon/week-7-task
RUN yarn
CMD ["yarn","start"]