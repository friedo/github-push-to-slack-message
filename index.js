var file_text = function( files, repo ) {
    var text = "```";
    files.forEach( function( file ) {
        text += '<' + repo.html_url + '/blob/master/' + file + '|' + file + ">\n";
    } );

    text += "```";

    return text;
}

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

        var files    = { 'added': { }, 'removed': { }, 'modified': { } };

        var commit_text = "```\n";
        commits.forEach( function( commit ) {
            var msg = commit.message;
            msg = msg.length > 57 ? msg.substr( 0, 57 ) + '...' : msg.substr( 0, 60 );
            commit_text += '<' + commit.url + '|' + commit.id.substr( 0, 9 ) + ' ' + msg + ">\n";

            commit.added.forEach(    function( file ) { files.added[ file ]    = true } );
            commit.removed.forEach(  function( file ) { files.removed[ file ]  = true } );
            commit.modified.forEach( function( file ) { files.modified[ file ] = true } );

        } );

        commit_text += '```';

        var message = {
            "text": '<' + sender.html_url + '|@' + sender.login + '> pushed ' + commits.length + ' commits to <' + repo.html_url + '|' + repo.full_name + '>',
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

        /* TODO: link to files on the correct branches */
        if ( Object.keys( files.added ).length > 0 ) {
            var add_attach = {
                'fallback':  'files were added in this push.',
                'color': '#00ff00',
                'title': 'Files added',
                'mrkdwn_in': [ 'text' ],
                'text': file_text( Object.keys( files.added ).sort(), repo )
            };

            message.attachments.push( add_attach );
        }

        if ( Object.keys( files.removed ).length > 0 ) {
            var rem_attach = {
                'fallback':  'files were removed in this push.',
                'color': '#ff0000',
                'title': 'Files removed',
                'mrkdwn_in': [ 'text' ],
                'text': file_text( Object.keys( files.removed ).sort(), repo )
            };

            message.attachments.push( rem_attach );
        }

        if ( Object.keys( files.modified ).length > 0 ) {
            var mod_attach = {
                'fallback':  'files were modified in this commit.',
                'color': '#eeee00',
                'title': 'Files modified',
                'mrkdwn_in': [ 'text' ],
                'text': file_text( Object.keys( files.modified ).sort(), repo )
            };

            message.attachments.push( mod_attach );
        }

        this.complete( message );
    }
};
