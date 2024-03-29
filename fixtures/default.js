var _ = require('lodash')
    , env = require('./env')
    ;

module.exports = _.merge({
    /*
     * Some default settings.
     *
     * You can generally leave this as is for general testing purposes.
     */
    simulation: true
    , instance_id: 'local_test_instance'
    , urls: {
        home: "http://rundexter.com/"
    }
    , instance_state: {
        active_step :  "local_test_step"
    }
    , workflow: {
        "id" : "local_test_workflow"
        , "title": "Local test workflow"
        , "description": "A fixture workflow used to test a module"
    }
    , steps: {
        local_test_step: {
            id: 'local_test_step'
            , type: 'module'
            //The test runner will change YOUR_MODULE_NAME to the correct module name
            , name: 'YOUR_MODULE_NAME'
            , next: []
        }
    }
    , modules: {
        //The test runner will add the proper data here
    }
    /*
     * End defaults
     */
    , environment: {
       /*
        * Any API keys you might need should go in the env.js.
        * For example:
        *
        "parse_app_id": "abc123"
        , "parse_app_key": "foobar"
        */
    }
    , user: {
        /*
         * Your dexter user settings should go in the env.js file and remain uncommitted.
         * For example:
         *
        profile: {
            id: 1,
            api_key: 'apikeytest'
        }
         */
        /*
         * You should also add your providers to env.js
         * Example:
        providers: {
            github: {
                access_token: 'abc123',
                username: 'foo'
            }
        }
         */
    }
    , data: {
        local_test_step: {
            /*
             * You should update this section with some test input for testing your module
             */
            input: {
                //Replace VAR1 with the name of an expected input, and add more inputs as needed.
                'ref': 'refs/heads/master',
                'before': '04fc760c0f1a0e4c7154a95109b61a6ae0fad6d8',
                'after': '5e56f4aae8b0d43870f90c5df99a3ad217c6ff0f',
                'compare': 'https://github.com/friedo/barf/compare/04fc760c0f1a...5e56f4aae8b0',
                'commits': [ [ ] ],
                'repository': { 'full_name': 'friedo/barf', 'html_url': 'https://github.com/friedo/barf' },
                'sender': { 'login': 'friedo', 'html_url': 'https://github.com/friedo' }
            }
        }
    }
}, env);
