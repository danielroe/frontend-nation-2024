// @ts-nocheck

export function colorHash(inputString){
	var sum = 0;
	
	for(var i in inputString){
		sum += inputString.charCodeAt(i);
	}

	let r = ~~(('0.'+Math.sin(sum+1).toString().substr(6))*256);
	let g = ~~(('0.'+Math.sin(sum+2).toString().substr(6))*256);
	let b = ~~(('0.'+Math.sin(sum+3).toString().substr(6))*256);

	var rgb = "rgb("+r+", "+g+", "+b+")";

	var hex = "#";

	hex += ("00" + r.toString(16)).substr(-2,2).toUpperCase();
	hex += ("00" + g.toString(16)).substr(-2,2).toUpperCase();
	hex += ("00" + b.toString(16)).substr(-2,2).toUpperCase();

	return {
    r, g, b, rgb, hex
	};
}
