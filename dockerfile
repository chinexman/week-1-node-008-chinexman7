FROM node:14-alpine
WORKDIR /Users/decagon/week-7-task
COPY . /Users/decagon/week-7-task
RUN yarn
CMD ["yarn","start"]



# FROM node:16-alpine as Compilation
# WORKDIR  temp/Compilation
# COPY . .
# RUN yarn
# RUN tsc

# FROM node:16-alpine as build
# WORKDIR temp/build
# COPY . .
# RUN yarn --production

# FROM node:16-alpine as production
# ENV node_ENV production
# WORKDIR /app
# COPY  -- from = Compilation   /temp/Compilation/dist
# COPY -- from = build    temp/build/node_modules
# COPY bin bin
# COPY public public
# COPY views views
# COPY package.json package.json

# EXPOSE 3000
# CMD ['node' 'bin/www']

