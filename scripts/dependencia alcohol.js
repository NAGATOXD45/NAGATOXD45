    $(document).ready(function(){
      $('#load_data').click(function(){
        $.ajax({
          url:"CSV/DEPENDENCIA_ALCOHOL.csv",
          dataType:"text",
          success:function(data)
          {
            var employee_data = data.split(/\r?\n|\r/);
            var record_count = employee_data.length - 1;
            var table_data = '<table id="mi-tabla" class="table table-dark table-striped table-bordered border-light">';
            for(var count = 0; count<employee_data.length; count++)
            {
              var cell_data = employee_data[count].split(",");
              table_data += '<tr>';
              for(var cell_count=0; cell_count<cell_data.length; cell_count++)
              {
                if(count === 0)
                {
                  table_data += '<th>'+cell_data[cell_count]+'</th>';
                }
                else
                {
                  table_data += '<td>'+cell_data[cell_count]+'</td>';
                }
              }
              table_data += '</tr>';
            }
            table_data += '</table>';
            $('#employee_table').html(table_data);
            $('#record_count_label').text('TOTAL: ' + record_count);
          }
        });
      });

      $('#search1, #search2, #search3, #search4, #search5, #search6').on('keyup change', function(){
        var search1 = $('#search1').val().toLowerCase();
        var search2 = $('#search2').val().toLowerCase();
        var search3 = $('#search3').val().toLowerCase();
        var search4 = $('#search4').val().toLowerCase();
        var search5 = $('#search5').val().toLowerCase();
        var search6 = $('#search6').val().toLowerCase();
        var filtered_rows = 0;// variable para contar filas filtradas
        $('table tbody tr').each(function(index){
          if(index === 0){ // skip first row (column headers)
            return;
          }
    
          var text1 = $(this).find('td').eq(1).text().toLowerCase();
          var text2 = $(this).find('td').eq(2).text().toLowerCase();
          var text3 = $(this).find('td').eq(3).text().toLowerCase();
          var text4 = $(this).find('td').eq(5).text().toLowerCase();
          var text5 = $(this).find('td').eq(13).text().toLowerCase();
          var text6 = $(this).find('td').eq(14).text().toLowerCase();
          var match1 = true;
          var match2 = true;
          var match3 = true;
          var match4 = true;
          var match5 = true;
          var match6 = true;
    
          if(search1 !== ''){
            match1 = match1 && text1.indexOf(search1) !== -1;
          }
    
          if(search2 !== ''){
            match2 = match2 && text2.indexOf(search2) !== -1;
          }
          
          if(search3 !== ''){
            match3 = match3 && text3.indexOf(search3) !== -1;
          }
          
          if(search4 !== ''){
            match4 = match4 && text4.indexOf(search4) !== -1;
          }
    
          if(search5 !== ''){
            match5 = match5 && text5.indexOf(search5) !== -1;
          }
    
          if(search6 !== ''){
            match6 = match6 && text6.indexOf(search6) !== -1;
          }
    
          if(match1 && match2 && match3 && match4 && match5 && match6){
            $(this).show();
            filtered_rows++;//MOSTRAR CONTADOR
          } else{
            $(this).hide();
          }
        });
        $('#record_count_label').text('REGISTROS: ' + filtered_rows);  
      });
    
      $('#show20').click(function(){
        $('table tbody tr').hide();
        $('table tbody tr:lt(21)').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });

      $('#show50').click(function(){
        $('table tbody tr').hide();
        $('table tbody tr:lt(51)').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });

      $('#show100').click(function(){
        $('table tbody tr').hide();
        $('table tbody tr:lt(101)').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });

      $('#show200').click(function(){
        $('table tbody tr').hide();
        $('table tbody tr:lt(201)').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });

      $('#show500').click(function(){
        $('table tbody tr').hide();
        $('table tbody tr:lt(501)').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });

      $('#showAll').click(function(){
        $('table tbody tr').show();
        $('#record_count_label').text('REGISTROS: ' + ($('table tbody tr:visible').length - 1));
      });
    });
    $(document).ready(function() {
      $('.dropdown-toggle').dropdown();
    });



        function exportToExcel() {
          /* Obtener los datos de la tabla */
          var table = document.getElementById('mi-tabla');
          var tableData = [];
          var visibleRows = table.querySelectorAll('tbody tr:not([style*="display: none"])');
          for (var i = 0, row; row = visibleRows[i]; i++) {
            var rowData = [];
            for (var j = 0, col; col = row.cells[j]; j++) {
              rowData.push(col.innerText);
            }
            tableData.push(rowData);
          }
      
          /* Crear un libro de Excel y agregar la hoja de trabajo */
          var workbook = XLSX.utils.book_new();
          var worksheet = XLSX.utils.aoa_to_sheet(tableData);
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabla');
      
          /* Descargar el archivo de Excel */
          XLSX.writeFile(workbook, 'mi-tabla.xlsx');
        }
      
        document.getElementById('export-btn').addEventListener('click', exportToExcel);
   