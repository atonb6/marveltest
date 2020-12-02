<section class="marvel-cards">
    <hr>
    <div class="container">

        <h1 class="text-center marvel-cards__title mt-3 mb-3">Marvel</h1>
    </div>
    <hr>
    <div class="container mt-5">
        <p id="message" class="text-center marvel-cards__message"></p>

        <div class="row align-items-center">
            <div class="col-md-6">
                <input class="mr-1" id="mySearchField" name="search" placeholder="Buscar.." type="text">
                <button class="btn btn--load mr-1" id="mySearchButton">Buscar</button>
                <button class="btn btn--load mr-1" id="myCleanButton">Limpiar</button>
            </div>
            <div class="col-md-6 text-right">
                <div id="myResponseArea"></div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div id="myContentArea"></div>
        </div>


        <div id="marvel-container" class="marvel-container mt-5 mb-5">
        </div>
        <div class="text-center mt-4">
            <a href="#" id="loadMore" class="btn btn--load mb-5">Cargar más</a>
        </div>
    </div>
</section>