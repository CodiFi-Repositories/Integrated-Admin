/**Change Undefined or Null to Empty*/
export function NullUndefined(data){
	if(data==null || data==undefined || data=="null" || data=="N/A" || data=="n/a" || data=="NaN" || data=="NA"){
		return data="";
	}else{
		return data;
	}
}