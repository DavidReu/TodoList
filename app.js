$(document).ready(function () {
    var $newtask = $('#newtache'),
        $valider = $('#valider'),
        $etat = $('#op-etat'),
        $tasks = [];


    // fonction qui barre la tâche terminée et qui désactive la checkbox
    function checked() {
        $('input[type="checkbox"]').click(function () {
            $(this).attr('disabled', 'disabled');
            var $parent = $(this).parent().parent();
            $parent.addClass('terminer');
        })
    }

    checked();

    function pagination(currentPage) {
        // Pagination
        // ----------------------------------------------------------
        var numberofItems = $('.list-group-item').length;
        var limitPerPage = 4;
        // Roud to upper number
        var totalPages = Math.ceil(numberofItems / limitPerPage);

        if(currentPage > 1) {
            $('#page .list-group-item').slice(limitPerPage * currentPage).hide(); // hide all elements after current page
            // pagination before current
            for(var i=1; i < currentPage; i++) {
                $(".pagination").append('<li class="page-item current-page"><a class="page-link" href="#">' + i + '</a></li>');
            }
            // current page
            $(".pagination").append('<li class="page-item current-page active"><a class="page-link" href="javascript:void(0)">' + currentPage + '</a></li>');
        
            // pagination after current
            for (var i = currentPage + 1; i <= totalPages; i++) {
                $(".pagination").append('<li class="page-item current-page"><a class="page-link" href="#">' + i + '</a></li>'); // Insert page number into pagination tabs
            };

        } else {
            $('#page .list-group-item').slice(limitPerPage).hide(); // hide all elements after current page
            // current page
            $(".pagination").append('<li class="page-item current-page active"><a class="page-link" href="javascript:void(0)">' + currentPage + '</a></li>');
        
            // pagination after current
            for (var i = 2; i <= totalPages; i++) {
                $(".pagination").append('<li class="page-item current-page"><a class="page-link" href="#">' + i + '</a></li>'); // Insert page number into pagination tabs
            };
        }

    
        $(".pagination li.current-page").on("click", function () {
            // Check if page number that was clicked on is the current page that is being displayed
            if ($(this).hasClass('active')) {
                return false; // Return false (i.e., nothing to do, since user clicked on the page number that is already being displayed)
            } else {
                var currentPage = $(this).index() + 1; // Get current page number
    
                $(".pagination li").removeClass('active'); // Remove the 'active' class status from the page that is currently being displayed
                $(this).addClass('active'); // Add the 'active' class status to the page that was clicked on
                $("#page .list-group-item").hide(); // Hide all items in loop, this case, all the list groups
    
                var grandTotal = limitPerPage * currentPage; // Get the total number of items up to the page number that was clicked on
    
                // Loop through total items, selecting a new set of items based on page number
                for (var i = grandTotal - limitPerPage; i < grandTotal; i++) {
                    $("#page .list-group-item:eq(" + i + ")").show(); // Show items from the new page that was selected
                }
            }
    
        });
    }

    pagination(1);

    /**
     * Création de tâche
     * + ajout dans un tableau on verra ensuite pour récupérer
     * peut être transformer en fichier json ?
     */
    $valider.click(function () {
        $task = $newtask.val();
        $tasks.push($task);
        $state = $etat.val();
        $('#list-tasks').append('<li class="list-group-item"> <div class="d-flex justify-content-center align-items-center"> <div class="form-check"> <input class="form-check-input increase" type="checkbox" value="finished" id="defaultCheck1"> <label class="form-check-label" for="defaultCheck1"> </label> </div> <p></p> <span class="badge badge-primary">Normale</span> </div> </li>'),
            $('#list-tasks li:last p').text($task);
        if ($state == "Urgente") {
            $('#list-tasks li:last span').removeClass("badge-primary").addClass("badge-danger"), $('#list-tasks li:last span').text("Urgente");

        };
        //callback pour que la fonction s'active aussi sur les nouvelles tâches
        checked();

        //supprime la dernière tâche dans le textarea
        $('textarea[name="task"]').val(null);

        // get current page of paginator
        var currentPage = $(".pagination li.current-page.active").index() + 1;
        // update pagination
        $(".pagination").empty();
        pagination(currentPage);
    });

});