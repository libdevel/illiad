function SelectAll(className){
	var items=document.getElementsByClassName(className);
	for(var i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
			items[i].checked=true;
	}
}
	
function UnSelectAll(className){
	var items=document.getElementsByClassName(className);
	for(var i=0; i<items.length; i++){
		if(items[i].type=='checkbox')
			items[i].checked=false;
	}
}