# SmartStops - Modules
SmartStops determines which services to invoke based on the question it is asked. Each service is invoked from a SmartStop module. SmartStop modules are files that conform to the following interface:

1) The module file should be deployed under the `modules/` directory. For example:

    modules.d/weather

2) The module file must be executable. For example, this should work:

    $ ./modules.d/weather

3) The module file must accept a `score` subcommand. The module will be passed via STDIN a JSON object containing relevant information (see [Module Input](#module_input) below). Using this information, the module should print to STDOUT a score between 0 and 1. This score represents the likelihood that the module can respond to the message sent by the user. For example:

    $ echo '{ "latitude": 37.775, "longitude": -122.413, "message": "what is the weather near 5545?", "phoneNumber": "7894561230" }' | ./modules.d/weather score 
    0.98

4) The module file must accept a `run` subcommand. The module will be passed via STDIN a JSON object containing relevant information (see [Module Input](#module_input) below). Using this information, the module should print to STDOUT the response that will be send to the user. For example:

    $ echo '{ "latitude": 37.775, "longitude": -122.413, "message": "what is the weather near 5545?", "phoneNumber": "7894561230" }' | ./modules.d/weather run
    The weather near bus stop 5545 is 59 F

## Module Input
Every module receives the following input for all subcommands via STDIN:

    {
      "latitude": <latitude of bus stop location>,
      "longitude": <longitude of bus stop location>,
      "message": <message sent by user>,
      "phoneNumber": <phone number that message originated from>
    }

