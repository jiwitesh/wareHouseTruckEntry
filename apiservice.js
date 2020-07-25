async function get_truck_vendor_details(truckNo){ 

	var payload = {"truckNo":truckNo};
	$.ajax({
	    url : "http://localhost:5000/predict",
	    type: "POST",
	    data : payload,
	    success: function(data, textStatus, jqXHR)
	    {
	        //data - response from server
	        console.log(data)
	    },
	    error: function (jqXHR, textStatus, errorThrown)
	    {
	 		console.error(errorThrown)
	    }
	});

}