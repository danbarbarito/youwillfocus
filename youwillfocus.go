package main

import (
	"flag"
	"fmt"
	"net/http"
	os_user "os/user"
	"time"

	"youwillfocus/app/common"
	"youwillfocus/app/home"
	_ "youwillfocus/app/user"
	"youwillfocus/app/about"

	"github.com/golang/glog"
	"github.com/gorilla/mux"
)

func main() {
	flag.Parse()
	defer glog.Flush()

	router := mux.NewRouter()
	http.Handle("/", httpInterceptor(router))

	router.HandleFunc("/", home.GetHomePage).Methods("GET")
	router.HandleFunc("/about", about.GetHomePage).Methods("GET")
	// router.HandleFunc("/user{_:/?}", user.GetHomePage).Methods("GET")

	// router.HandleFunc("/user/view/{id:[0-9]+}", user.GetViewPage).Methods("GET")
	// router.HandleFunc("/user/{id:[0-9]+}", user.GetViewPage).Methods("GET")

	fileServer := http.StripPrefix("/static/", http.FileServer(http.Dir("static")))
	http.Handle("/static/", fileServer)

	// Run on port 80 if running as root, 8080 if not

	runningAs, _ := os_user.Current()

	port := ":8080"

	switch runningAs.Username {
	case "root":
		port = ":80"
	}

	err := http.ListenAndServe(port, nil)

	if err != nil {
		fmt.Println(err)
	}
}

func httpInterceptor(router http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		startTime := time.Now()

		router.ServeHTTP(w, req)

		finishTime := time.Now()
		elapsedTime := finishTime.Sub(startTime)

		switch req.Method {
		case "GET":
			// We may not always want to StatusOK, but for the sake of
			// this example we will
			common.LogAccess(w, req, elapsedTime)
		case "POST":
			// here we might use http.StatusCreated
		}

	})
}
