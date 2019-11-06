package main

import (
	"encoding/json"
	"io/ioutil"
	"os"

	log "github.com/sirupsen/logrus"

	"autoshop/api/db"
	"autoshop/api/server"
)

type config struct {
	BasePath    string    `json:"base_path" default:"127.0.0.1"`
	MySQLConfig db.Config `json:"db"`
}

func main() {
	confFile, err := ioutil.ReadFile("conf.json")
	if err != nil {
		log.Fatalf("Failed to read configuration file: %s", err.Error())
	}

	conf := config{}
	err = json.Unmarshal(confFile, &conf)
	if err != nil {
		log.Fatalf("Failed to unmarshal configuration file: %s", err.Error())
	}

	db.Init(conf.MySQLConfig)

	// Check if static folder is present
	if _, err := os.Stat("static/vehicle_pictures/"); os.IsNotExist(err) {
		log.Warnln("Static folder not found, creating....")
		// Try to create it
		err = os.MkdirAll("static/vehicle_pictures/", os.ModePerm)
		if err != nil {
			log.Fatalf("Failed to create static dir: %s", err)
		}
	}

	server.Run(server.ContextParams{
		DBConf: conf.MySQLConfig,
	})

	log.Exit(0)
}
