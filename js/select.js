$(document).ready(function() {
	
	// Start of with some basic GET request. We shall use "?find_loc=Mexico+City,+Distrito+Federal"
	var urlStart = "?find_loc=Mexico+City,+Distrito+Federal";
	// get the current URL in the address bar.
	var urlGet = window.location.toString();
		
	// if the address bar URL does not have ?find_loc=Mexico+City,+Distrito+Federal then add it to its end.
	if(-1 === urlGet.indexOf("?find_loc=Mexico+City,+Distrito+Federal")){
		var url = urlGet + urlStart;
	}else{
		var url = urlGet;
	}
	
	/* selecting some checkboxes on load */	
	
	//store all the checkboxes' names in an allCheckboxesay
	var allCheckboxes = $(":input[type=checkbox]").map(function() { return this.name; }).get();
	var x;
	for (x=0;x<allCheckboxes.length;x++){
		var theName = allCheckboxes[x].replace(/\s/g, "");
		if(-1 != url.indexOf(theName)){
			
			var check = ":input[name=" + allCheckboxes[x] + "]";
			$(check).attr('checked', true);
			
			
		}
	}
		
	// upon clicking a checkbox:
	$(':input[type=checkbox]').change(function() {
			
		// a GET request will be of the form: "...search-result_new.html?find_loc=Mexico+City,+Distrito+Federal&name1=keyword1+keyword2+keyword3+&name2=keyword4+...."
		var name = $(this).parent().parent().children("h1").text();
		name = name.replace(/\s/g, "");
		var keyword = $(this).attr('name');
		keyword = keyword.replace(/\s/g, "");
				
		// if the address bar URL does not contain our name, then add it to its end.
		if(-1 === url.indexOf(name)) 
			url += '&' + name + "=";
			
		// If the address bar URL does not contain our keyword, find its name, and add it to its end. Eg: delivery+ or opennow+ after Feature=
		if(-1 === url.indexOf(keyword)){ 
			var urlGen = name + "=" + keyword + ",";
			var urlGen1 = name + "=" + keyword;
			var urlGen2 = name + "=";
			
			// if it is the fir	st keyword, dont add the comma in the end. if ( (some other name starts after this name) or (this name is the last one in the url) )
			if(('&' == url.charAt(url.indexOf(urlGen2) + urlGen2.length))||(url.length == (url.indexOf(urlGen2) + urlGen2.length)))
				url = url.replace(urlGen2,urlGen1);
			else
				url = url.replace(urlGen2,urlGen);
			
				
		}else{ 
		//If it does contain our keyword, remove it.
			var urlGen = keyword + ",";
			var urlGen1 = "," + keyword;
			var urlGen2 = "&" + name + "=";
			
			// if there is a , after the keyword, remove the keyword and comma. Otherwise remove the keyword and the comma before it!
			if(',' == url.charAt(url.indexOf(keyword) + keyword.length))
				url = url.replace(urlGen,"");
			else{
				var num = url.indexOf(keyword) - 1;
				if(',' == url.charAt(num))
					url = url.replace(urlGen1,"");
				else
					url = url.replace(keyword,"");
			}
			
			// if it is the last keyword, get rid of the name as well
			if(('&' == url.charAt(url.indexOf(urlGen2) + urlGen2.length))||(url.length == (url.indexOf(urlGen2) + urlGen2.length)))
				url = url.replace(urlGen2,"");
		}
		
		// where the magic happens.
		window.location.href = url;
				
	});
	
	var sortLinks = $(".sortlink a").map(function() { return this.name; }).get();
	var i;
	var sectionLinks = $(".section a").map(function() { return this.name; }).get();
	var j;
	
	//check which names are in the URL in the address bar. Select checkboxes with those names only.
	for (i=0;i<sortLinks.length;i++){	
		var name = "Sortby=";
		var keyword = $.trim(sortLinks[i]);		
		var theName = "a[name='" + keyword + "']";		
		keyword = keyword.replace(/\s/g, "");

		// if the address bar URL does not contain our name, then add it to its end.		
		if(-1 === url.indexOf(name)) 
			var url2 = url + '&' + name + keyword;
		else{
			var url2 = url;	 
		
			// THE PLAN: indexOf + length to take us to the end of: Sortby=  
			// Then do indexOf(pattern, index), with pattern being '&' and index being the character from above ^ to get the the character after the keyword.
			// get the substring between these two character locations
			// replace with with the current keyword. YEE HAW!
			
			var start = url2.indexOf(name) + name.length;
			var end = url2.indexOf("&", start);	
			
			if (-1 === end)
				end = url2.length;	
				
			var sortKeyword = url2.substring(start,end);
			url2 = url2.replace(sortKeyword,keyword);				
		}
		
		$(theName).attr('href', url2);
		
		if(-1 != url.indexOf(keyword)){
			$(theName).addClass('selected');
		}
	}
	
	//check which names are in the URL in the address bar. Select checkboxes with those names only.
	for (j=1;j<(sectionLinks.length-2);j++){	
		var name2 = "Distance=";
		var keyword2 = $.trim(sectionLinks[j]);		
		var theName2 = "a[name='" + keyword2 + "']";		
		keyword2 = keyword2.replace(/\s/g, "");

		// if the address bar URL does not contain our name, then add it to its end.		
		if(-1 === url.indexOf(name2)) 
			var url3 = url + '&' + name2 + keyword2;
		else{
			var url3 = url;	 
			
			var start2 = url3.indexOf(name2) + name2.length;
			var end2 = url3.indexOf("&", start2);	
			
			if (-1 === end2)
				end2 = url3.length;	
				
			var sortKeyword2 = url3.substring(start2,end2);
			url3 = url3.replace(sortKeyword2,keyword2);				
		}
		
		$(theName2).attr('href', url3);
		
		if(-1 != url.indexOf(keyword2)){
			$(theName2).addClass('selected');
		}
	}
	
});