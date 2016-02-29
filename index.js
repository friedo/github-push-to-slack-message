module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var before    = step.input( 'before' ).first();
        var after     = step.input( 'after' ).first();
        var compare   = step.input( 'compare' ).first();
        var commits   = step.input( 'commits' ).first();
        var repo      = step.input( 'repository' ).first();
        var sender    = step.input( 'sender' ).first();

        var commit_text = "```\n";
        commits.forEach( function( commit ) {
            commit_text += commit.id.substr( 0, 7 ) + ' ' + commit.message.substr( 0, 40 ) + '...' + "\n";
        } );

        var message = {
            "text": '<' + sender.html_url + '|@' + sender.login + '> pushed ' + commits.length + ' commits to ' + '<' + repo.html_url + '|' + repo.full_name + '>',
            "attachments": [ {
                'fallback': 'fallback text',
                'color': '#00ffff',
                'author_name': '@' + sender.login,
                'author_link': sender.html_url,
                'author_icon': sender.avatar_url,
                'title': 'View changes',
                'title_link': compare,
                'text': commit_text,
                "mrkdwn_in": [ 'text' ]
            } ]
        };

        this.complete( message );
    }
};
