<template>
  <div class="edit-container">
    <Navbar />
    <div class="content-box">
      <div class="nav-buttons">
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 1 }"
            @mouseover="setHover(1)"
            @mouseleave="resetHover"
            @click="changeHover(1)"
          >
            Personal Info [1]
          </button>
        </router-link>
        
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 2 }"
            @mouseover="setHover(2)"
            @click="changeHover(2)"
          >
            Personal Info [2]
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 3 }"
            @mouseover="setHover(3)"
            @click="changeHover(3)"
          >
            Personal Info [3]
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 4 }"
            @mouseover="setHover(4)"
            @click="changeHover(4)"
          >
            Farm Profile
          </button>
        </router-link>
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 5 }"
            @mouseover="setHover(5)"
            @click="changeHover(5)"
          >
            Farm Profile II
          </button>
        </router-link>
      </div>
      <br>
      <br>
      <div class="personal-info-sections">
        <!-- Personal Information I -->
        <div v-if="isHovered === 1" id="personalInfoI" class="personal-info-section">
          <form @submit.prevent="submitForm">
            <div class="row mb-3">
              <div class="input-field">
                <select v-model="farmer.enrollment_type" spellcheck="false" class="black-select">
                  <option value="New">New</option>
                  <option value="Updating">Updating</option>
                </select>
                <label>Enrollment Type:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.reference_number"
                  required
                  spellcheck="false"
                />
                <label>Reference Number:</label>
              </div>
              <br>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.surname"
                  required
                  spellcheck="false"
                />
                <label>SURNAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.first_name"
                  required
                  spellcheck="false"
                />
                <label>FIRST NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.middle_name"
                  required
                  spellcheck="false"
                />
                <label>MIDDLE NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.extension_name"
                  required
                  spellcheck="false"
                />
                <label>EXTENSION NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.sex"
                  required
                  spellcheck="false"
                />
                <label>GENDER:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.house_lot_bldg_no_purok"
                  required
                  spellcheck="false"
                />
                <label>HOUSE/LOT/BLDG/NO.PUROK:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.street_sitio_subdv"
                  required
                  spellcheck="false"
                />
                <label>STREET/SITIO/SUBDV.:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.barangay"
                  required
                  spellcheck="false"
                />
                <label>BARANGAY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.municipality_city"
                  required
                  spellcheck="false"
                />
                <label>MUNICIPALITY/CITY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.province"
                  required
                  spellcheck="false"
                />
                <label>PROVINCE:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.region"
                  required
                  spellcheck="false"
                />
                <label>Region:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mobile_number"
                  required
                  spellcheck="false"
                />
                <label>MOBILE NUMBER:</label>
              </div>
            </div>
          </form>
        </div>

        <!-- Personal Information II -->
        <div v-if="isHovered === 2" id="personalInfoII" class="personal-info-section">
            <div class="row mb-3">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.landline_number"
                  required
                  spellcheck="false"
                />
                <label>LANDLINE NUMBER:</label>
              </div>
              <div class="input-field">
                <input
                  type="date"
                  v-model="farmer.date_of_birth"
                  spellcheck="false"
                />
                <label>DATE OF BIRTH:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth"
                  required
                  spellcheck="false"
                />
                <label>PLACE OF BIRTH:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth_province_state"
                  required
                  spellcheck="false"
                />
                <label>Province/State:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.place_of_birth_country"
                  required
                  spellcheck="false"
                />
                <label>Country:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.religion"
                  spellcheck="false"
                />
                <label>Religion:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.civil_status"
                  spellcheck="false"
                />
                <label>CIVIL STATUS:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.name_of_spouse_if_married"
                  spellcheck="false"
                />
                <label>NAME OF SPOUSE IF MARRIED:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mothers_maiden_name"
                  required
                  spellcheck="false"
                />
                <label>MOTHERS MAIDEN NAME:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.household_heads"
                  required
                  spellcheck="false"
                />
                <label>HOUSEHOLD HEADS:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_no_name_of_household_heads"
                  spellcheck="false"
                />
                <label>IF NO, NAME OF HOUSEHOLD HEADS:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.relationship"
                  spellcheck="false"
                />
                <label>RELATIONSHIP:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_living_household_members"
                  spellcheck="false"
                />
                <label>NO. OF LIVING HOUSEHOLD HEADS:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_male"
                  spellcheck="false"
                />
                <label>NO. OF MALE:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_female"
                  spellcheck="false"
                />
                <label>NO. OF FEMALE:</label>
              </div>
            </div>
        </div>

        <!-- Personal Information III -->
        <div v-if="isHovered === 3" id="personalInfoIII" class="personal-info-section">
            <div class="row mb-3">
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.highest_formal_education"
                  spellcheck="false"
                />
                <label>HIGHEST FORMAL EDUCATION:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.person_with_disability"
                  spellcheck="false"
                />
                <label>PERSON WITH DISABILITY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.IVps_beneficiary"
                  spellcheck="false"
                />
                <label>IVps BENEFICIARY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.member_of_an_indiginous_group"
                  spellcheck="false"
                />
                <label>MEMBER OF INDIGINOUS GROUP:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.with_government_id"
                  spellcheck="false"
                />
                <label>WITH GOVERNMENT ID:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_yes_specify_id_type"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR ID:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.id_number"
                  spellcheck="false"
                />
                <label>ID NUMBER:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.member_of_any_farmers_association_cooperative"
                  spellcheck="false"
                />
                <label>MEMBER OF ANY FARMERS ASSOCIATION:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_yes_spefify_farmers_association"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR FARMERS ASSOCIATION:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.person_to_notify_in_case_of_emergency"
                  spellcheck="false"
                />
                <label>PERSON TO NOTIFY INCASE OF IMERGENCY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.contact_number"
                  spellcheck="false"
                />
                <label>CONTACT NUMBER:</label>
              </div>            
            </div>
          </div>

          <!-- Personal Information IV -->
        <div v-if="isHovered === 4" id="personalInfoIV" class="personal-info-section">
          <div class="row mb-3">
            <nav class="navbar">
            <div class="navbar-content">
              <div class="checkbox-group">
                <div class="checkbox-list">
                  <label>Main Livelihood:</label>
                  <label v-for="option in livelihoodOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="farmer.main_livelihood" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </nav>
        <!-- Farming Activity checkboxes -->
          <div class="checkbox-group">
            <label class="farming-activity-label">TYPE OF FARMING ACTIVITY:</label>
            <div class="check-box">
              <label v-for="activity in farmingActivityOptions" :key="activity">
                <input type="checkbox" :value="activity" v-model="farmer.type_of_farming_activity" />
                {{ activity.replace('_', ' ').toLowerCase() }} <!-- Format activity names -->
              </label>
            </div>
          </div>
          <!-- Conditional checkbox group for farmworkers -->
          <div class="checkbox-group" >
            <label class="farming-activity-label">FOR FARMWORKERS:</label>
            <div class="check-box">
              <label v-for="task in farmworkerTaskOptions" :key="task">
                <input type="checkbox" :value="task" v-model="farmer.farmworkers_kind_of_work" />
                {{ task.replace('_', ' ').toLowerCase() }} <!-- Format task names -->
              </label>
            </div>
          </div>
          <!-- Conditional checkbox group for fisherfolk -->
          <div class="checkbox-group">
            <label class="farming-activity-label">FOR FISHERFOLK:</label>
            <div class="check-box">
              <label v-for="task in fishfolkTaskOptions" :key="task">
                <input type="checkbox" :value="task" v-model="farmer.for_fisherfolk" />
                {{ task.replace('_', ' ').toLowerCase() }} <!-- Format task names -->
              </label>
            </div>
          </div>
          <!-- Conditional checkbox group for fisherfolk -->
          <div class="checkbox-group">
            <label class="farming-activity-label">AGRI YOUTH:</label>
            <div class="check-box">
              <label v-for="task in agriYouthTaskOptions" :key="task">
                <input type="checkbox" :value="task" v-model="farmer.for_agri_youth" />
                {{ task.replace('_', ' ').toLowerCase() }} <!-- Format task names -->
              </label>
            </div>
          </div>
          
          </div>
          <div class="row mb-3">
            <div class="input-field" v-if="Array.isArray(farmer.type_of_farming_activity) && farmer.type_of_farming_activity.includes('type_of_farming_activities_other')">
              <input
                type="text"
                v-model="farmer.type_of_farming_activities_other"
                spellcheck="false"
              />
              <label>Other, For Type of Activity:</label>
            </div>

            <div class="input-field" v-if="Array.isArray(farmer.type_of_farming_activity) && farmer.type_of_farming_activity.includes('other_crop')">
              <input
                type="text"
                v-model="farmer.other_crop_specify"
                spellcheck="false"
              />
              <label>Other, Crops Specify:</label>
            </div>

            <div class="input-field" v-if="Array.isArray(farmer.type_of_farming_activity) && farmer.type_of_farming_activity.includes('livestock')">
              <input
                type="text"
                v-model="farmer.livestock_specify"
                spellcheck="false"
              />
              <label>Other, Livestocks Specify:</label>
            </div>

            <div class="input-field" v-if="Array.isArray(farmer.type_of_farming_activity) && farmer.type_of_farming_activity.includes('poultry')">
              <input
                type="text"
                v-model="farmer.poultry_specify"
                spellcheck="false"
              />
              <label>Other, Poultry Specify:</label>
            </div>

            <div class="input-field" v-if="Array.isArray(farmer.farmworkers_kind_of_work) && farmer.farmworkers_kind_of_work.includes('for_farmworkers_other')">
              <input
                type="text"
                v-model="farmer.for_farmworkers_other"
                spellcheck="false"
              />
              <label>Other, For Farmworker:</label>
            </div>

            <div class="input-field" v-if="Array.isArray(farmer.for_fisherfolk) && farmer.for_fisherfolk.includes('for_fishfolk_other')">
              <input
                type="text"
                v-model="farmer.for_fishfolk_other"
                spellcheck="false"
              />
              <label>Other, For Fishfolk:</label>
            </div>          
            <div class="input-field" v-if="Array.isArray(farmer.for_agri_youth) && farmer.for_agri_youth.includes('for_agri_youth_other')">
              <input
                type="text"
                v-model="farmer.for_agri_youth_other"
                spellcheck="false"
              />
              <label>Other, For Agri Youth:</label>
            </div>
          </div>
        </div>

        <div v-if="isHovered === 5" id="personalInfoIV" class="personal-info-section">
          <form @submit.prevent="submitForm">
            <div class="table-container">
                <!-- Table 1 -->
                <table id="farmTable1">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Dx  escription</th>
                            <th>CROP/COMMODITY <br>(Rice/Corn/HVC/Livestock/Poultry/Agri-fishery) <br> For Livestock & Poultry <br>(specify type of animal)</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head <br>(For Livestock and Poultry)</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner <br>(Y/N)</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows1">
                        <tr class="farmRow">
                            <td class="parcelNo">1</td>
                            <td>
                                <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy1" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni1" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="totalSizeHa" class="ha" readonly> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_1" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_1" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_1" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_1" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_1" spellcheck="false"/>
                                <label>Crops / Commodity (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_2" spellcheck="false"/>
                                <label>Crops / Commodity (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_3" spellcheck="false" />
                                <label>Crops / Commodity (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_4" spellcheck="false" />
                                <label>Crops / Commodity (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.crop_commodity1_5" spellcheck="false" />
                                <label>Crops / Commodity (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_1" spellcheck="false" step="any" />
                                <label>Size (ha) (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_2" spellcheck="false" step="any" />
                                <label>Size (ha) (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_3" spellcheck="false" step="any" />
                                <label>Size (ha) (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_4" spellcheck="false" step="any" />
                                <label>Size (ha) (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.sizeHa1_5" spellcheck="false" step="any" />
                                <label>Size (ha) (5):</label>
                              </div>
                              <div class="total-size">
                                <p>Total Size (ha): {{ totalSizeHa }}</p>
                              </div>
                            </td>
                            <td>
                              <div class="input-field1">
                                <input type="text" v-model="farmer.no_of_head1_1" spellcheck="false" step="any" />
                                <label>No. of Heads (1):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_2" spellcheck="false" step="any" />
                                <label>No. of Heads (2):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_3" spellcheck="false" step="any" />
                                <label>No. of Heads (3):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_4" spellcheck="false" step="any" />
                                <label>No. of Heads (4):</label>
                              </div>
                              <div class="input-field1">
                                <input type="number" v-model="farmer.no_of_head1_5" spellcheck="false" step="any" />
                                <label>No. of Heads (5):</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <input type="number" v-model="farmer.farm_type1" spellcheck="false" step="any" />
                                <label>Farm Type:</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field2">
                                <input type="text" v-model="farmer.organic_practitioner1" spellcheck="false" step="any" />
                                <label>Practitioner :</label>
                              </div>
                            </td>
                            <td>
                              <div class="input-field3">
                                <textarea type="text" v-model="farmer.remarks1" spellcheck="false"/>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                
                <button type="button" @click="addFarmTable" class="add-farm-table-button">Add Farm Table (2)</button>


      
                <table v-if="showFarmTable2" id="farmTable2">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Description</th>
                            <th>CROP/COMMODITY</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows2">
                        <tr class="farmRow">
                            <td class="parcelNo">2</td>
                            <td>
                              <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy2" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni2" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="farmer.total_farm_area_2" class="ha"> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_2" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_2" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_2" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_2" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <textarea v-model="farmer.crop_commodity2" style="width: 350px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.sizeHa2" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.no_of_head2" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.farm_type2" style="width: 250px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.organic_practitioner2" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.remarks2" style="width: 100px; height: 250px;"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
              
                <button type="button" @click="addFarmTable2" class="add-farm-table-button">Add Farm Table (3)</button>
              
                <table v-if="showFarmTable3" id="farmTable3">
                    <thead>
                        <tr>
                            <th>Farm Parcel No.</th>
                            <th>Farm Land Description</th>
                            <th>CROP/COMMODITY</th>
                            <th>SIZE (ha)</th>
                            <th>No. of Head</th>
                            <th>Farm Type</th>
                            <th>Organic Practitioner</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody id="farmRows3">
                        <tr class="farmRow">
                            <td class="parcelNo">3</td>
                            <td>
                              <div>
                                    <b>Farm Location:</b>
                                    <input type="text" v-model="farmer.farm_location_brgy3" class="farm-location-input">
                                    <div style="text-align: center;">Barangay</div>
                                    <input type="text" v-model="farmer.farm_location_city_muni3" class="farm-location-input">
                                    <div style="text-align: center;">City/Municipality</div>
                                    <br>
                                    <b>Total Farm Area (in hectares):</b> <input type="number" v-model="farmer.total_farm_area_3" class="ha"> ha <br>
                                    <b>Within Ancestral Domain:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.ancestral_domain_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Document No.:</b> <input type="text" v-model="farmer.ownership_document_no_3" class="farm-location-input2"> <br>
                                    <b>Agrarian Reform Beneficiary:</b>
                                    <label v-for="task in AncestralDomainTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.agrarian_reform_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    <b>Ownership Type:</b>
                                    <label v-for="task in OwnershipTypeTaskOptions" :key="task">
                                      <input type="radio" :value="task" v-model="farmer.registered_owner_3" />
                                      {{ task.replace('_', ' ').toLowerCase() }} 
                                    </label><br>
                                    Tenant(Name of Land Owner: <input type="text" v-model="farmer.tenant_3" class="farm-location-input2">)<br>
                                    Lessee(Name of Land Owner: <input type="text" v-model="farmer.lessee_3" class="farm-location-input2">)
                                </div>
                            </td>
                            <td>
                              <textarea v-model="farmer.crop_commodity3" style="width: 350px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.sizeHa3" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.no_of_head3" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.farm_type3" style="width: 250px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.organic_practitioner3" style="width: 150px; height: 250px;"></textarea>
                            </td>
                            <td>
                              <textarea v-model="farmer.remarks3" style="width: 100px; height: 250px;"></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
              
            </div>
            <button type="submit" class="submit-button" style="display: block; margin: 0 auto;">Update</button>
          </form>
        </div>
        <div v-if="alertMessage" class="alert-box">
          <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
          <h1>Success</h1>
          <p>{{ alertMessage }}</p>
          <button @click="closeAlert">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isHovered = ref(1);
const alertMessage = ref(''); 
const showFarmTable2 = ref(false);
const showFarmTable3 = ref(false); 

const addFarmTable = () => {
  showFarmTable2.value = true;
};
const addFarmTable2 = () => {
  showFarmTable3.value = true;
};

const totalSizeHa = computed(() => {
  return (
    (parseFloat(farmer.value.sizeHa1_1) || 0) +
    (parseFloat(farmer.value.sizeHa1_2) || 0) +
    (parseFloat(farmer.value.sizeHa1_3) || 0) +
    (parseFloat(farmer.value.sizeHa1_4) || 0) +
    (parseFloat(farmer.value.sizeHa1_5) || 0)
  );
});

// Data object to store farmer details
const farmer = ref({
  enrollment_type: '',
  reference_number: '',
  surname: '',
  first_name: '',
  middle_name: '',
  extension_name: '',
  sex: '',
  house_lot_bldg_no_purok: '',
  street_sitio_subdv: '',
  barangay: '',
  municipality_city: '',
  province: '',
  mobile_number: '',
  landline_number: '',
  date_of_birth: '',
  place_of_birth: '',
  religion: '',
  civil_status: '',
  name_of_spouse_if_married: '',
  mothers_maiden_name: '',
  household_heads: '',
  if_no_name_of_household_heads: '',
  relationship: '',
  no_of_living_household_members: '',
  no_of_male: '',
  no_of_female: '',
  highest_formal_education: '',
  person_with_disability: '',
  IVps_beneficiary: '',
  member_of_an_indiginous_group: '',
  with_government_id: '',
  if_yes_specify_id_type: '',
  id_number: '',
  member_of_any_farmers_association_cooperative: '',
  if_yes_spefify_farmers_association: '',
  person_to_notify_in_case_of_emergency: '',
  contact_number: '',
  main_livelihood: [],
  type_of_farming_activity:[],
  farmworkers_kind_of_work: [],
  for_fisherfolk:[],
  for_agri_youth:[],
  type_of_farming_activities_other:'',
  other_crop_specify: '',
  livestock_specify: '',
  poultry_specify: '',
  for_farmworkers_other: '',
  for_fishfolk_other: '',
  for_agri_youth_other: '',

});

// List of checkboxes for main livelihood
const livelihoodOptions = [
  'farmer',
  'farmworker/laborer',
  'fisherfolk',
  'agri youth'
];
const farmingActivityOptions = [
  'rice',
  'corn',
  'other_crop',
  'livestock',
  'poultry',
  'type_of_farming_activities_other'
];
const farmworkerTaskOptions = [
  'land preparation',
  'planting / transplanting',
  'cultivation',
  'harvesting',
  'for_farmworkers_other'
];
const fishfolkTaskOptions = [
  'fish capture',
  'aquaculture',
  'gleaning',
  'fish processing',
  'fish vending',
  'for_fishfolk_other'
];
const agriYouthTaskOptions = [
  'part of a farming household',
  'attending attended formal agri fishery related course',
  'attending attended non formal agri fishery related course',
  'participated in any agricultural activity program',
  'for_agri_youth_other'
];

const AncestralDomainTaskOptions = [
  'yes',
  'no'
];

const OwnershipTypeTaskOptions = [
  'Register Owner',
  'Others'
];

// Fetch farmer details from Directus database
const fetchFarmerDetails = async () => {
  try {
    const farmerId = route.params.id; // Assuming the route includes the farmer ID
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      alert('No authentication token found. Please log in again.');
      return;
    }

    const response = await axios.get(`http://localhost:8055/items/farmers/${farmerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Set the fetched data to the farmer object
    Object.assign(farmer.value, response.data.data);
  } catch (error) {
    console.error('Error fetching farmer details:', error.response ? error.response.data : error.message);
    alert('An error occurred while fetching the farmer details.');
  }
};

// On mounted, fetch the farmer data
onMounted(() => {
  fetchFarmerDetails();
});

// Function to log activity (email, time, and action) to localStorage
const logActivity = async (email, action) => {
  const token = localStorage.getItem('auth_token'); 
  try {
    await axios.post('http://localhost:8055/items/activity_logs', {
      admin_email: email,
      action: action,
      time: new Date().toISOString(),
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Increment unread notifications
    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
// Function to submit the form and update the farmer in Directus
const submitForm = async () => {
  try {
    const farmerId = route.params.id; // Assuming ID is passed via the route
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      alert('No authentication token or email found. Please log in again.');
      return;
    }

    let response;
    try {
      // Attempt to make the PATCH request with the current access token
      response = await axios.patch(`http://localhost:8055/items/farmers/${farmerId}`, farmer.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      // If the request fails with a 401 Unauthorized error (token expired), attempt to refresh the token
      if (error.response && error.response.status === 401) {
        // Attempt to refresh the token
        const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          // Store new tokens in localStorage
          localStorage.setItem('auth_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

          // Retry the PATCH request with the new access token
          response = await axios.patch(`http://localhost:8055/items/farmers/${farmerId}`, farmer.value, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              'Content-Type': 'application/json',
            },
          });
        } else {
          alert('Session expired. Please log in again.');
          window.location.href = '/';
          return;
        }
      } else {
        // Handle other errors
        console.error('Error updating farmer:', error.response ? error.response.data : error.message);
        alert('An error occurred while updating the farmer.');
        return;
      }
    }

    // Log activity with email and reference number
    logActivity(email, `Updated farmer with reference number: ${farmer.value.reference_number}`);

    // Show success alert
    alertMessage.value = 'Farmer Updated Successfully!';

    // Redirect to farmers index page on success
    setTimeout(() => {
      router.push('/farmers/index'); // Adjust this path according to your routing setup
    }, 5000); // Redirect after 2 seconds
  } catch (error) {
    console.error('Error updating farmer:', error.response ? error.response.data : error.message);
    alert('An error occurred while updating the farmer.');
  }
};

    // Close the alert and navigate to farmers index
    const closeAlert = () => {
      alertMessage.value = ''; // Clear the alert message
      router.push('/farmers/index'); // Navigate to the farmers index page
    };

// Function to handle hover state
const setHover = (index) => {
  isHovered.value = index;
};

const resetHover = () => {
  isHovered.value = 1;
};
</script>

<style scoped>
/* Styling similar to create.vue */
.edit-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f2f4f7;
  overflow: hidden;
}

.content-box {
  padding: 2rem;
  background-color: #f2f4f7;
  margin-top: 2rem;
  border-radius: 8px;
  height: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
}

.nav-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-left: 60px;
}

.nav-button {
  background-color: #387e90;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.hover-green {
  background-color: #46cab6;
  color: white;
}

.submit-button {
  margin-top: 20px;
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: darkgreen;
}
.farm-location-input {
    width: 450px;
    display: block;
    margin: 5px auto 5px auto; /* Center horizontally */
    height: 35px;
}

.farm-location-input2 {
    width: 245px;
    height: 35px;
}
.ha {
    width: 70px;
}
.add-farm-table-button {
    background-color: #4CAF50; /* Green background */
    color: white; /* White text */
    border: none; /* No border */
    padding: 10px 20px; /* Top/bottom and left/right padding */
    text-align: center; /* Centered text */
    text-decoration: none; /* No underline */
    display: inline-block; /* Inline block element */
    font-size: 16px; /* Font size */
    margin: 20px 0; /* Margin around the button */
    cursor: pointer; /* Pointer cursor on hover */
    border-radius: 5px; /* Rounded corners */
    transition: background-color 0.3s; /* Transition effect for hover */
    margin: 10px;
}

.add-farm-table-button:hover {
    background-color: #45a049; /* Darker green on hover */
}
.input-field1 {
    position: relative;
    height: 70px;
    /* height: 350px; */
}
.input-field1 input {
    width: 240px;
    height: 50px;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}
.input-field2 input {
    width: 150px;
    height: 50px;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}
.input-field3 textarea {
    width: 150px;
    height: 350px;
    border-radius: 6px;
    font-size: 15px;
    padding: 0 15px;
    border: 1px solid black;
    background: transparent;
    color: black;
    outline: none;
    appearance: none; /* Remove default arrow */
    -webkit-appearance: none; /* Remove default arrow for Safari */
}
.input-field1 label {
    position: absolute;
    top: 35%;
    left: 15px;
    transform: translateY(-50%);
    color: black;
    font-size: 15px;
    pointer-events: none;
    transition: 0.3s;      
}
    
    
.black-select option {
    background-color: #F8F9FA;
    color: black;
  }

  input:focus {
  border: 2px solid lightgreen;
}
select:focus ~ label,
select:valid ~ label {
    top: 0;
    left: 15px;
    font-size: 14px;
    padding: 0 2px;
    background: #f2f4f7;
    }
input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 14px;
  padding: 0 2px;
  background: #f2f4f7;
}
.arrow-down1 {
    position: absolute;
    top: 35%;
    right: 18px; 
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid white; 
    transform: translateY(-50%);
    pointer-events: none; 
}
.add-crops {
  color: white;
  background-color: #387e90;
  border-color: #387e90;
  border-radius: 5px;
  border: 1px solid #387e90;
  margin-bottom: 10px;
}
.add-crops:hover {
  background-color: #46cab6; /* Darker shade for hover effect */
  border-color: #46cab6;
  color: #f0f0f0; /* Light gray color for text on hover */
}
</style>
