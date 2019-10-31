package main

import (
	"encoding/json"
	"io/ioutil"

	log "github.com/sirupsen/logrus"

	"autoshop/db"
	"autoshop/server"
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

	server.Run(server.ContextParams{
		DBConf: conf.MySQLConfig,
	})

	log.Exit(0)
}
