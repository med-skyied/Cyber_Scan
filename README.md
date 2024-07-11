
# Cyber Scan
#img[]

### This is a Cyber ecurity project, This project will be a tool to get infromations and analyse Targets. and will present the data in a Cyber Security Maner.
This tool provides a cyber security analyst with tools to gather information and evaluate the security aspects of a target. be it a person or a system or everything in between.

This project provides the following services to it's users:
	(free for every one):

	#### Evalua te the connection ssecurity:
		This tool evaluats tw main aspects of the internet connection of the user whc=ich are:
			-> security level: this shows if your connnection is secure or not (based on proxy/vpn relays existance)
			-> risk level: this tells you the likelyhood of you being flagged by secure web services (like: bank website, goverment sites etc...). this is true for the webservices tht use fraud protection measures.

	#### Target Precise information gathering:
		This tool permitts you to gether various informations about your target, this uses the surper API from google to execute search operations, and return breaif results (on the Google search engine)

	#### DNS Lookup:
		This determins the assocaited ipv4 addresses of a given host name.

	#### HTTP Headers:
		This Shows the HTTP headers that your client sends when connecting to a webserver. (importing to know how much data youreveal about your self.)

	#### IP Address History:
		One of the most important steps to gather infotmations about a target is to observe the history of the assigned ip addresses, This is important in forensics analysis.
	#### My IP Address:
		A simple tool to show your Ip address as seen in the internet.
	#### Scan a target for open common ports:
		A web scanning service to scan your target for open ports that corresponds to a service you can exploit. provide eaither an ip address in case of a server or a domain name in case of webservers.

	(private for registered users):
	### in this service we provide data provided to us by the public API of cve-search and it is operated by CIRCL.(Computer Incident Response Center Luxembourg).
	
	Under this, we provide the following services: 

	#### Explore the vendors that have security vulnerabilities discovered in them. (both now and in and in the past).

	#### Explore the affected products of a given vendor that has the security vulnerabilities discovered in them.

	#### Search for a vulnerability by it's CVE-ID:
		This tool fetch the databases to retrieve details about the CVE-ID the user provided.
		a cve id (i.e: CVE-xxxx-xxxxx), ex: (CVE-2021-40488) [a public vulnerability in a microsoft product].

	#### Get more informations about the current vulnerabilities databases. (the ones used in this system).





### The services of this applicatioin rely on multiple external API providers.
	#### the External API providers
		#### ViewDns
		#### Surper
		#### circl.lu (Computer Incident Response Center Luxembourg)

#### To start this application:	
	start the back-end going to the back-end folder and typing: ```python3 -m api.v1.app```
	to start the front-end app, to to the front-end folder and type: ``` npm install | npm start```

	the flask application requires few additional libraries includiing:
		to install flask,
		to install flask_cors,
		and to install sql_alchemy,
		etc... (errors will notify you of the required packages)

#### Back-End technologies:
	python,
	flask,
	MongoDb / Mysql,
	Json Files.

#### Front-end technologies:
	React,
	Javascript / typescript,
	
#### The back-end folder is under: cyber_scan_b-e
#### The Front-end folder is under: cyber_scan_f-e
