/* global AddLinksInErrorBox */

'use strict';

if( GetCurrentAppID() > 0 )
{
	const selectorsToTry =
	[
		'#error_box',
		'#app_agegate',
		'#agegate_box',
		'.agegate_age_validation',
	];

	for( const selector of selectorsToTry )
	{
		const container = document.querySelector( selector );

		if( container )
		{
			AddLinksInErrorBox( container );
			break;
		}
	}
}

GetOption( { 'enhancement-skip-agecheck': false }, ( items ) =>
{
	if( items[ 'enhancement-skip-agecheck' ] )
	{
		const dateFuture = new Date();
		dateFuture.setFullYear( dateFuture.getFullYear() + 1 );
		const date = dateFuture.toUTCString();

		document.cookie = 'wants_mature_content=1; expires=' + date + '; path=/app/; Secure; SameSite=Lax;';
		document.cookie = 'wants_mature_content=1; expires=' + date + '; path=/bundle/; Secure; SameSite=Lax;';
		document.cookie = 'lastagecheckage=1-January-1970; expires=' + date + '; path=/; Secure; SameSite=Lax;';
		document.cookie = 'birthtime=1; expires=' + date + '; path=/; Secure; SameSite=Lax;';

		// Make sure we know how to bypass this agegate before redirecting
		// App 526520 causes inifite redirects due to an error message on agecheck url
		if( document.querySelector( '#agecheck_form, #app_agegate' ) )
		{
			document.location.href = document.location.href.replace( /\/agecheck/, '' );
		}
	}
	else
	{
		const container = document.getElementById( 'app_agegate' );

		if( !container )
		{
			return;
		}

		const optionsLink = document.createElement( 'a' );
		optionsLink.target = '_blank';
		optionsLink.textContent = _t( 'agecheck_option_hint' );
		optionsLink.href = GetLocalResource( 'options/options.html' ) + '#skip_agecheck';

		const linkContainer = document.createElement( 'div' );
		linkContainer.className = 'steamdb_error_link steamdb_agecheck_hint';
		linkContainer.append( optionsLink );

		container.append( linkContainer );
	}
} );
