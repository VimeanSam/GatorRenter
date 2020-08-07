# GatorRenter
Real-Estate Rental Website for SFSU students. This is a group project for CSC 648 Software Engineering course at SFSU. Agile Software Engineering process are used to carry out this website such as Scrum meetings, code reviews, and other Software Engineering Lifecycle.
## Stack
- Frontend: HTML, Bootstrap, CSS
- Backend: Node.js, Express, MySQL
## Run Locally
1. Git clone project link. 
2. npm install.
3. Make sure you have MySQL installed and modify the config file to match your MySQL server setting.
4. Create Database that you would like to use and make sure the database in the config file exists within your MySQL environment.
5. IMPORTANT: make sure you run powershell as ADMINISTRATOR, navigate to C:/ directory and execute "set-executionpolicy remotesigned" for sequelize to execute properly.
6. ``node bin/www`` to run project.
7. Visit localhost:4000
## Screenshots
1. Welcome page
![](/public_html/Screenshots/GatorRenter_1.jpg)
2. Signup: register as landlord or student. Students are able to message landlord and landlords are able to add listings with approval of site administrator. 
![](/public_html/Screenshots/signup.jpg)
![](/public_html/Screenshots/GatorRenter_5.jpg)
![](/public_html/Screenshots/mylisting.jpg)
3. Dashboard: site administrator can approve or reject listings. The approved listings will be listed on search results and the rejected listings will be removed from database.
![](/public_html/Screenshots/GatorRenter_6.jpg)
![](/public_html/Screenshots/GatorRenter_7.jpg)
![](/public_html/Screenshots/GatorRenter_8.jpg)
4. Home Profile: details about the listing.
![](/public_html/Screenshots/GatorRenter_9.jpg)
5. District: explore information about the main districts around San Francisco.
![](/public_html/Screenshots/GatorRenter_10.jpg)
![](/public_html/Screenshots/GatorRenter_11.jpg)
6. Google Maps view of listings is available
![](/public_html/Screenshots/map.jpg)