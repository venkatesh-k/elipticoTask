$(function(){
	// Populate date to centre content on load of the page
	$.ajax({ 
		type: 'GET', 
		url: 'https://api.myjson.com/bins/5bdb3', 
		dataType: 'json',
		success: function (data) {
			var allProgs = "";
			$.each(data, function(index, ele) {
				if(index<3){
					var data = '<div class="program" data-programid="'+ele.ProgramID+'"><h3>'+ele.Name+'<a href="javascript:void(0)"><img src="images/edit.png"/></a></h3>';
					data+= '<p class="salesby">Sales by Month</p><div class="graph-wrap">';
					var currYear = ele.Sales.CurrentYear;
					var prevYear = ele.Sales.PreviousYear;
					var graphMax = Math.max.apply(null,currYear.concat(prevYear));
					for(var i=0;i<currYear.length;i++){
						data+= '<div style="height:'+ (100*prevYear[i]/graphMax) +'%;" class="barchart voilet"></div>';
						data+= '<div style="height:'+ (100*currYear[i]/graphMax) +'%;" class="barchart pink"></div>';
					}
					data+= '</div><div class="graph-xaxis">'
					var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
					for(var i=0;i<currYear.length;i++){
						data+= '<span>'+months[i]+'</span>';
					}
					data+= '</div><div class="tms"><table><tr><td rowspan="2">Total Monthly<span class="sales">Sales</span></td><td>Current</td><td>1-Year</td></tr>';
					data+= '<tr><td><span class="current">$'+ ele.TotalMonthlySales +'</span></td><td><img src="images/graph1.png"/></td></table></div>'
					data+= '<p class="more"><a href="javascript:void(0)">more</a></p></div>';
					$('#program').append(data);
				}else
					$('.all-progs > table tbody').append('<tr><td>'+ele.Name+'</td><td>$'+ele.TotalMonthlySales+'</td><td>'+ele.MonthlyAttendance+' Visits</td></tr><tr><td colspan="3"><a href="javascript:void(0)">more</a></td></tr>');
			});
		}
	});
	
	// on clicking more, it will fetch data and populate will populate it
	$(document).on('click', '.more a', function(e){
		if($(this).closest(".program").find('.moredata').length > 0){
			if($(this).html()=="more")
				$(".more a").html("less").parent().prev().show();
			else
				$(".more a").html("more").parent().prev().hide();
		}else{
			$.ajax({ 
				type: 'GET', 
				url: 'https://api.myjson.com/bins/47axv', 
				dataType: 'json',
				success: function (data) {
					$.each(data, function(index, ele) {
						$prog = $(".program[data-programid='" + ele.ProgramID + "']");
						if(!$prog.find(".tms").next().hasClass("moredata")){
							$prog.find(".tms").after('<div class="moredata"><table><thead><tr><td>Price Name</td><td>Current</td><td>1-Year</td></tr></thead><tbody></tbody></table></div>');
						}
						$prog.find('.moredata tbody').append("<tr><td><span>"+ele.Name+"</span></td><td>$"+ele.Sales+"</td><td><img src='images/graph2.png'/></td></tr>");
					});
					
					$(".more a").html('less');
				}
			});
		}
	});
});