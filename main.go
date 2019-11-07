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
	MySQLConfig             db.Config `json:"db"`
	VehiclePicturesPath     string    `json:"vehicle_pictures_path"`
	VehicleMakePicturesPath string    `json:"vehicle_make_pictures_path"`
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
	// Check if static folder is present for vehicle pictures
	if _, err := os.Stat(conf.VehiclePicturesPath); os.IsNotExist(err) {
		log.Warnln("Static folder not found, creating....")
		// Try to create it
		err = os.MkdirAll(conf.VehiclePicturesPath, os.ModePerm)
		if err != nil {
			log.Fatalf("Failed to create static dir for vehicle pictures: %s", err)
		}
	}

	// Check if static folder is present for vehicle make pictures
	if _, err := os.Stat(conf.VehicleMakePicturesPath); os.IsNotExist(err) {
		log.Warnln("Static folder not found, creating....")
		// Try to create it
		err = os.MkdirAll(conf.VehicleMakePicturesPath, os.ModePerm)
		if err != nil {
			log.Fatalf("Failed to create static dir for vehicle make pictures: %s", err)
		}
	}

	server.Run(server.ContextParams{
		DBConf:                  conf.MySQLConfig,
		VehiclePicturesPath:     conf.VehiclePicturesPath,
		VehicleMakePicturesPath: conf.VehicleMakePicturesPath,
	})

	log.Exit(0)
}
