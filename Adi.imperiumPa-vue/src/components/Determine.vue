<template>
<div class="row justify-content-center flex-row align-items-center" id="appDetermina">
        <div class="col-lg-12">
            <div class="card-wrapper card-space">
                <div class="card card-bg" style="border-radius: 20px; box-shadow: 0 10px 25px 0 rgb(0 0 0 / 20%);" >
                    <div class="card-header">
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h3 class="text-primary mb-0">Gestione Determine</h3>
                            </div>
                            <div class="col-sm-6 text-right">
                                <input type="button" class="btn btn-sm btn-outline-secondary" id="openTabDetermine" data-target="#mdElenco" data-toggle="modal" value="Elenco Determine" />
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="needs-validation" id="bodyDetermina">
                            <div class="row">
                                <div class="col-sm-6 text-left">
                                    <h5 class="mb-5 text-left text-primary" id="intestazione">Determina</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="cupDetermina" class="">CUP</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="text"
                                            v-model="determina.cup"
                                            @input="determina.cup = $event.target.value.toUpperCase()"
                                            class="form-control text-uppercase"
                                            id="cupDetermina"
                                            maxlength="15"
                                            @keypress="CheckInput"
                                            @keyup="Validation"
                                            placeholder="Codice Unico Progetto"
                                            name="cupDetermina">
                                        <div class="invalid-feedback">
                                            Immettere il CUP di riferimento.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="cigDetermina" class="">CIG</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="text"
                                            v-model="determina.cig"
                                            @input="determina.cig = $event.target.value.toUpperCase()"
                                            @keyup="Validation"
                                            @keypress="CheckInput"
                                            @blur="CheckCig($event.target.value)"
                                            class="form-control text-uppercase"
                                            maxlength="10"
                                            id="cigDetermina"
                                            placeholder="Codice Identificativo Gara"
                                            name="cigDetermina">
                                        <div class="invalid-feedback">
                                            Immettere il CIG di riferimento.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="derDetermina" class="">CIG Derivato</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="text"
                                            v-model="determina.derivato"
                                            @input="determina.derivato = $event.target.value.toUpperCase()"
                                            @keyup="Validation"
                                            @keypress="CheckInput"
                                            maxlength="10"
                                            class="form-control text-uppercase"
                                            id="derDetermina"
                                            placeholder="Codice Gara Derivato"
                                            name="derDetermina">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="lottoDetermina" class="">Lotto</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="text"
                                            v-model="determina.lotto"
                                            @input="determina.lotto = $event.target.value.toCapitalize()"
                                            @keypress="Validation"
                                            name="lottoDetermina"
                                            id="lottoDetermina"
                                            class="form-control text-capitalize"
                                            placeholder="Descrizione Lotto" />
                                        <div class="invalid-feedback">
                                            Immettere il lotto aggiudicato.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="startDetermina" class="active">Stipula Contratto</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="date"
                                            min="2000-01-01"
                                            max="5000-12-31"
                                            v-model="determina.stipula"
                                            @change="Validation"
                                            name="startDetermina"
                                            id="startDetermina"
                                            class="form-control text-upper"
                                            placeholder="" />
                                        <div class="invalid-feedback">
                                            Immettere la data di stipula del Contratto.
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-md-4 col-lg-4">
                                    <div class="form-group">
                                        <label for="endDetermina" class="active">Scadenza Contratto</label>
                                        <input autocomplete="off"
                                            value=""
                                            title=""
                                            type="date"
                                            min="2000-01-01"
                                            max="5000-12-31"
                                            v-model="determina.scadenza"
                                            @change="Validation"
                                            name="endDetermina"
                                            id="endDetermina"
                                            class="form-control text-upper"
                                            placeholder="" />
                                        <div class="invalid-feedback">
                                            Immettere la data di scadenza del Contratto.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center pb-4">
                                <div class="col-sm-12 text-center">
                                    <button id="addDeterina" @click="SalvaDetermina" type="button" class="btn btn-primary btn-sm m-1"><i class="far fa-save mr-2"></i>Salva</button>
                                    <button id="resDeterina" @click="Reset" type="button" class="btn btn-secondary btn-sm m-1"><i class="fas fa-redo-alt mr-2"></i>Nuova</button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h5 class="mb-5 text-left text-primary">Documenti</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-3">
                                <div class="form-group" style="margin-bottom: 2rem">
                                    <label for="tdDetermina" class="active">Tipo Documento</label>
                                    <select class="form-control emptyAutoSelect"
                                        placeholder="Seleziona Opzione"
                                        name="tdDetermina"
                                        id="tdDetermina"
                                        autocomplete="off">
                                    </select>
                                    <div id="errTdDetermina" class="invalid-feedback">
                                        Selezionare il tipo di documento da associare.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-2 text-center">
                                <input type="file" name="upload1" @click="Validation" id="fileDetermina" accept="application/pdf" class="upload" />
                                <label for="fileDetermina">
                                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                                    <span>File</span>
                                </label>
                                <div id="errFileDetermina" class="invalid-feedback" style="margin-top: -10px">
                                    Documento non presente.
                                </div>
                                <div class="progress-bar-wrapper" style="margin-top: -18px; display: none">
                                    <div class="progress-bar-label" id="lbProgressBar" style="font-size: 0.9rem;"><span class="sr-only">Progresso </span>35%</div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="00" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-3 col-lg-3">
                                <ul class="upload-file-list">
                                    <li class="upload-file">
                                        <i id="iconDocDetermina" style="display: none" class="far fa-file-pdf"></i>
                                        <p id="nomeDocDetermina">Nessun documento associato</p>
                                        <button id="btRemDocDetermina" style="display: none" type="button"><i class="fas fa-times text-danger"></i></button>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-12 col-md-4 col-lg-2 text-center">
                                <button id="sendFile" type="button" @click="Allega" class="btn btn-outline-primary btn-sm"><i class="fas fa-paperclip mr-2"></i>Allega Documento</button>
                            </div>
                        </div>
                        <div class="row justify-content-center mb-4">
                            <div class="col-md-12">
                                <table id="tDocDetermina" class="respTable table" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th style="width: 15%">Prog.</th>
                                            <th style="width: 20%">Tipo</th>
                                            <th style="width: 55%">Nome Documento</th>
                                            <th style="width: 15%">Azioni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-sm-6 text-left">
                                <h5 class="mb-5 text-left text-primary">Autorizzazioni</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="startPeriodo" class="active">Inizio Periodo</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="date"
                                        name="startPeriodo"
                                        v-model="autorizzazioni.inizioPeriodo"
                                        @change="Validation"
                                        id="startPeriodo"
                                        min="2000-01-01"
                                        max="5000-12-31"
                                        class="form-control"
                                        placeholder=" " />
                                    <div class="invalid-feedback">
                                        Immettere la data di stipula del Contratto.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="endPeriodo" class="active">Termine Periodo</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="date"
                                        min="2000-01-01"
                                        max="5000-12-31"
                                        name="endPeriodo"
                                        v-model="autorizzazioni.finePeriodo"
                                        @change="Validation"
                                        id="endPeriodo"
                                        class="form-control text-upper"
                                        placeholder=" " />
                                    <div class="invalid-feedback">
                                        Immettere la data di scadenza del Contratto.
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="oreRDC" class="">Ore R.D.C.</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="number"
                                        step="1"
                                        name="oreRDC"
                                        v-model="autorizzazioni.nrOreRdc"
                                        @keyup="Validation"
                                        id="oreRDC"
                                        class="form-control onlyNumber"
                                        placeholder="Ore per Reddito di Cittadinanza" />
                                    <div class="invalid-feedback">
                                        Immettere la ore autorizzate Fondo R.d.C.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="oreIsee" class="">Ore I.S.E.E. Inf. 6000 €</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="number"
                                        step="1"
                                        name="oreIsee"
                                        v-model="autorizzazioni.nrOreInf"
                                        @keyup="Validation"
                                        id="oreIsee"
                                        class="form-control onlyNumber"
                                        placeholder="Ore per ISEE < 6000 €" />
                                    <div class="invalid-feedback">
                                        Immettere la ore autorizzate Fondo Isee inf. € 6000
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="oreAltri" class="">Ore Altri</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="number"
                                        step="1"
                                        name="oreAltri"
                                        v-model="autorizzazioni.nrOreAltri"
                                        @keyup="Validation"
                                        id="oreAltri"
                                        class="form-control onlyNumber"
                                        placeholder="Ore Altri" />
                                    <div class="invalid-feedback">
                                        Immettere la ore autorizzate per il Fondo Altri
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-4 col-lg-4">
                                <div class="form-group">
                                    <label for="oreModAgg" class="">Ore Modulo Aggiuntivo</label>
                                    <input autocomplete="off"
                                        value=""
                                        title=""
                                        type="number"
                                        step="1"
                                        name="oreModAgg"
                                        v-model="autorizzazioni.nrOreAgg"
                                        id="oreModAgg"
                                        class="form-control onlyNumber"
                                        placeholder="Ore Aggiuntive" />
                                    <div class="invalid-feedback">
                                        Immettere ore Autorizzate come Modulo Aggiuntivo.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-sm-12 text-center">
                                <button id="addAutorizzazioni" @click="addAuthorize" type="button" class="btn btn-primary btn-sm"><i class="fas fa-plus-circle mr-2"></i>Agg. Autorizzazioni</button>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-12 my-4">
                                <table id="tbAutorizzazioni" class="respTable table" style="width: 100%">
                                    <thead>
                                        <tr>
                                            <th style="width: 10%">Prog.</th>
                                            <th style="width: 15%">Inizio</th>
                                            <th style="width: 15%">Fine</th>
                                            <th style="width: 15%">Ore R.d.C.</th>
                                            <th style="width: 15%">Ore Inf. 6000</th>
                                            <th style="width: 15%">Ore Altri</th>
                                            <th style="width: 15%">Ore Aggiuntive</th>
                                            <th style="width: 15%">Rimuovi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--   Inizio Modali -->
        <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="mdElenco">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Elenco Determine</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body mt-4">
                        <div class="col">
                            <table id="tbDetermine" class="respTable table" style="width: 100%">
                                <thead>
                                    <tr>
                                        <th style="width: 20%">CUP</th>
                                        <th style="width: 20%">CIG</th>
                                        <th style="width: 30%">Lotto</th>
                                        <th style="width: 15%">Stipula</th>
                                        <th style="width: 15%">Scadenza</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal alert-modal fade" tabindex="-1" role="dialog" id="openDetExist">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header align-items-center">
                        <%--<svg class="icon">
                            <use href="/node_modules/bootstrap-italia/dist/svg/sprites.svg#it-info-circle"></use>
                        </svg>--%>
                        <i class="fas fa-exclamation-triangle mr-2" style="color:#d90000"></i><h5 class="modal-title">Determina già presente</h5>
                    </div>
                    <div class="modal-body">
                        <div class="col">
                            <p>
                                Il CIG inserito è già presente nel sistema.<br />
                                Richiamarlo?
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-primary btn-sm" type="button" @click="RecallDet({codice:1})" id="recallDet">Richiama</button>
                        <button class="btn btn-outline-danger btn-sm" @click="RecallDet({codice:0})" type="button" id="dismissSe">Annulla</button>
                        <small class="form-text text-muted" style="font-size:.75rem"><font style="color:#d90000">Attenzione!</font><br />Nel caso in cui non si procede al caricamento della determina esistente il sistema sovrascriverà le informazioni.</small>
                    </div>
                </div>
            </div>
        </div>
        <!--   Fine Modali -->
    </div>






</template>