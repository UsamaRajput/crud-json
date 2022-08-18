
        $(document).ready(function(){
            function urlWeb(page){
                var fullUrl = window.location.href;

                let url =  fullUrl.substring(0, fullUrl.lastIndexOf('/')) + "/";

                return `${url}${page}.php`;            
            }
            // urlWeb('php/insert_record')
            // Fetch All Data From DataBase
            function loadData(){
                $("#table-data table tbody").empty();
                $.ajax({
                url:urlWeb('php/fetch_all_data'),
                    type: "GET",
                    success : function(d){
                        if(d.status == false){
                            $("#table-data table tbody").append("<tr><td colspan='6'>"+d.msg+"</td></tr>")    
                        }else{
                        $.each(d,function(key,  value){
        $("#table-data table tbody").append("<tr>"+ "<td>" + value.id + "</td>"
        + "<td>" + value.name + "</td>"
        + "<td>" + value.age + "</td>"
        + "<td>" + value.city + "</td>"
        + "<td><button id='edit-btn' data-eid='"+value.id+"'>Edit</button></td>"
        + "<td><button id='del-btn' data-did='"+value.id+"'>Delete</button></td>"
        + "</tr>");
                        });
                    }
                }
                });
            }
            loadData();
            // popup Show And Hide Code Fetch single Data From DataBase
            $(document).on("click","#edit-btn",function(){
                $("#popup").show();
                var fid = $(this).data("eid"); 
                var obj = {id : fid};
                var jsonId = JSON.stringify(obj); 
                $.ajax({
                url:urlWeb('php/fetch_single_data'),
                type: "POST",
                data: jsonId,
                success : function(s){
                var sData = s[0];
                $("#popup #up-id").val(sData.id);
                $("#popup #up-name").val(sData.name);
                $("#popup #up-age").val(sData.age);
                $("#popup #up-city").val(sData.city);
                }
                });
            });
            $(".pop-close").click(function(){
                $("#popup").hide();
            });
            // Data Insert Function
            function insertData(fName){
                var fArr = $(fName).serializeArray();
                
                var fObj = {};
                for(var i = 0; i<fArr.length; i++){
                    if(fArr[i].value == ""){
                        return false;
                    }
                    fObj[fArr[i].name] = fArr[i].value;
                }
                var jData = JSON.stringify(fObj);
                return jData;
            }
            // Message Show In Box
            function message(msg,status){
                if(status == true){
                    
                    $("#error-msg").fadeOut();
                    $("#success-msg").html(msg).fadeIn();
                    setTimeout(function(){
                        $("#success-msg").fadeOut();
                    },3000);
                }
                else{        
                    $("#success-msg").fadeOut();
                    $("#error-msg").html(msg).fadeIn();
                    setTimeout(function(){
                        $("#error-msg").fadeOut();
                    },3000);
                }
            }
            // Insert Data in DataBase 
            $("#isubmit").on("click",function(e){
                e.preventDefault();
                var fId = $("#inForm");
                var rData = insertData(fId);
                if(rData == false){
                    message("All Fields Are Required",false);   
                }else{
                $.ajax({
                    url:urlWeb('php/insert_record'),
                    type:"POST",
                    data: rData,
                    success:function(r){
                        var imsg = r.msg;
                        var istatus = r.status;
                        message(imsg,istatus);
                        if(istatus == true){
                            $("#inForm").trigger("reset");
                            loadData();
                        }                        
                    }
                });
            }

            });
            
            // Update Data InTo DataBase
            $("#up-sub").on("click",function(u){
                u.preventDefault();
                var uData = insertData("#upForm");
                if(uData == false){
                    message("All Feilds Are Required",false);
                }else{
                $.ajax({
                url:urlWeb('php/updata_data'),
                    type:"POST",
                    data:uData,
                    success:function(u){
                        var uMsg = u.msg;
                        var uStatus = u.status; 
                        if(uStatus == true){
                            message(uMsg,uStatus);
                            $("#popup").hide();
                            loadData();
                        }
                    }
                });
            }

            });
        
            // Delete Data Code

            $(document).on("click","#del-btn",function(){
              if(confirm("Do You Want To Delete This?")){
                var delId = $(this).data("did");
                var jsObj = {id:delId};
                var jsonId = JSON.stringify(jsObj); 
                var row = this;
                $.ajax({
                url:urlWeb('php/delete_data'),
                   type: 'POST',
                   data:jsonId,
                   success:function(del){
                    if(del.status == true){
                        message(del.msg,del.status);
                        $(row).closest("tr").fadeOut();
                    }else{
                        message(del.msg,del.status); 
                    }
                   }
                });
              }
            });
        
            // Search Data Into dataBase
            $("#search").on("keyup",function(){
                var searchTerm = $(this).val();
                $("#table-data table tbody").html("");
                $.ajax({
                url:urlWeb('php/search_data')+"?search=" + searchTerm,
                // url:"http://localhost/phpWeb/crud_json/php/search_data.php?search=" + searchTerm,
                    type:"GET",
                    success : function(d){
                        if(d.status == false){
                        $("#table-data table tbody").append("<tr><td colspan='6'>"+d.msg+"</td></tr>")    
                        }
                        else{
                        $.each(d, function(key, value){
        $("#table-data table tbody").append("<tr><td>" + value.id + "</td><td>" + value.name + "</td><td>" + value.age + "</td><td>" + value.city + "</td><td><button id='edit-btn' data-eid='"+value.id+"'>Edit</button></td><td><button id='del-btn' data-did='"+value.id+"'>Delete</button></td></tr>");
                        });
                    }
                }
                });
            });
        });
