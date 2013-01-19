# SmartStops - Modules
SmartStops determines which services to invoke based on the question it is asked. Each service is invoked from a SmartStop module. SmartStop modules are files that conform to the following interface:

1) The module file should be deployed under the `modules/` directory. For example:

    modules/weather

2) The module file must be executable. For example, this should work:

    $ ./module/weather

3) The module file must accept a `score <question>` subcommand. It should evalute the question passed to it and print to STDOUT a score between 0 and 1. This score represents the likelihood that the module can answer the given question. For example:

    $ ./module/weather "what is the weather near 5545?"
    0.98

4) The module file must accept a `answer <question>` subcommand. It should evaluate the question passed to it and print to STDOUT the answer that will be returned to the user. For example:

    $ ./module/weather "what is the weather near 5545?"
    The weather near bus stop 5545 is 59 F


