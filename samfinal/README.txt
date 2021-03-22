
https://bitbucket-mut.d.bbg/scm/~bonnetetele/sam-front.git

Insatallation:

NodeJS dans le Wiki: https://teams.microsoft.com/l/entity/com.microsoft.teamspace.tab.wiki/tab::50a152a1-cfa0-4f85-a494-c4b04c2035ed?context=%7B%22subEntityId%22%3A%22%7B%5C%22pageId%5C%22%3A24%2C%5C%22sectionId%5C%22%3A26%2C%5C%22origin%5C%22%3A2%7D%22%2C%22channelId%22%3A%2219%3A0a0cff78c96846a384d1f52927b7f4d2%40thread.skype%22%7D&tenantId=d5bb6d35-8a82-4329-b49a-5030bd6497ab

Sam:

Ouvrez l'invit de command
Allez dans le dossier
Changez l’url dans App.js en fonction de l’api
Tapez "npm i"
Puis "Npm run dev"
N'hesites pas a Ctrl+C mail.js s'il prend trop de temps
Rendez vous a l'adresse indiquee, en general: "http:localhost//1234", dans votre browser

L'application est dev en react, avec beaucoup de composant de MUI par google et un peu de Semantic React.
Il y a deux pages, le dashboard et le meeting. Quelques composants ne sont plus ou pas encore fonctionnels.
Les appels a l'api sont isoles dans un custom-hook. Et il est important de mettre a jour l'url dans App.js.
Google et le VTT de stream ont ete laisses de cote au profit de Azure. 
