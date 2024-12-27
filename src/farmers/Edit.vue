<template>
  <div class="edit-container">
    <Navbar />
    <div class="content-box">
      <div class="nav-buttons">
        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 1 }"
          >
            Personal Info
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 2 }"
          >
            Farm Profile
          </button>
        </router-link>

        <router-link to="#">
          <button
            class="nav-button"
            :class="{ 'hover-green': isHovered === 3 }"
          >
            Farm Profile II
          </button>
        </router-link>
      </div>
      <br>
      <br>
      <div class="top-section">
        <div class="info-box">
          <h1> Name: {{ farmer.surname }}, {{ farmer.first_name }}, {{ farmer.middle_name }}, {{ farmer.extension_name }} </h1>
          <h2>Location: {{ farmer.house_lot_bldg_no_purok }}, {{ farmer.street_sitio_subdv }}, {{ farmer.barangay }}, {{ farmer.municipality_city }}, {{ farmer.region }} </h2>
        </div>
      </div>
      <div class="personal-info-sections">
        <form @submit.prevent="submitForm">
        <div v-if="isHovered === 1" id="personalInfoI" class="personal-info-section">
            <div class="row mb-3">
              <div class="input-field">
                <select v-model="farmer.enrollment_type" spellcheck="false" class="black-select">
                  <option value="New">New</option>
                  <option value="Updating">Updating</option>
                </select>
                <label>Enrollment Type:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.reference_number"
                  required
                  spellcheck="false"
                  maxlength="15"
                />
                <label>Reference Number:</label>
              </div>
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
                <select v-model="farmer.sex" spellcheck="false" class="black-select" required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.sex && !['male', 'female', 'Other'].includes(farmer.sex)" :value="farmer.sex">
                    {{ farmer.sex }}
                  </option>
                </select>
                <label>Gender:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.sex && farmer.sex !== 'male'  && farmer.sex !== 'female'" class="input-field">
                <input type="text" v-model="farmer.sex" spellcheck="false" />
                <label>Please specify your sex:</label>
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
                <select v-model="farmer.barangay" required spellcheck="false" class="black-select"  >
                  <option value="Alitao">Alitao</option>
                  <option value="Alsam Ibaba">Alsam Ibaba</option>
                  <option value="Alsam Ilaya">Alsam Ilaya</option>
                  <option value="Alupay">Alupay</option>
                  <option value="Angeles Zone I (Poblacion)">Angeles Zone I (Poblacion)</option>
                  <option value="Angeles Zone II">Angeles Zone II</option>
                  <option value="Angeles Zone III">Angeles Zone III</option>
                  <option value="Angeles Zone IV">Angeles Zone IV</option>
                  <option value="Angustias Zone I (Poblacion)">Angustias Zone I (Poblacion)</option>
                  <option value="Angustias Zone II">Angustias Zone II</option>
                  <option value="Angustias Zone III">Angustias Zone III</option>
                  <option value="Angustias Zone IV">Angustias Zone IV</option>
                  <option value="Anos">Anos</option>
                  <option value="Ayaas">Ayaas</option>
                  <option value="Baguio">Baguio</option>
                  <option value="Banilad">Banilad</option>
                  <option value="Ibabang Bukal">Ibabang Bukal</option>
                  <option value="Ilayang Bukal">Ilayang Bukal</option>
                  <option value="Calantas">Calantas</option>
                  <option value="Calumpang">Calumpang</option>
                  <option value="Camaysa">Camaysa</option>
                  <option value="Dapdap">Dapdap</option>
                  <option value="Kanlurang Domoit">Kanlurang Domoit</option>
                  <option value="Silangang Domoit">Silangang Domoit</option>
                  <option value="Gibanga">Gibanga</option>
                  <option value="Ibas">Ibas</option>
                  <option value="Ilasan Ibaba">Ilasan Ibaba</option>
                  <option value="Ilasan Ilaya">Ilasan Ilaya</option>
                  <option value="Ipilan">Ipilan</option>
                  <option value="Isabang">Isabang</option>
                  <option value="Katigan Kanluran">Katigan Kanluran</option>
                  <option value="Katigan Silangan">Katigan Silangan</option>
                  <option value="Lakawan">Lakawan</option>
                  <option value="Lalo">Lalo</option>
                  <option value="Lawigue">Lawigue</option>
                  <option value="Lita">Lita</option>
                  <option value="Malaoa">Malaoa</option>
                  <option value="Masin">Masin</option>
                  <option value="Mate">Mate</option>
                  <option value="Mateuna">Mateuna</option>
                  <option value="Mayowe">Mayowe</option>
                  <option value="Ibabang Nangka">Ibabang Nangka</option>
                  <option value="Ilayang Nangka">Ilayang Nangka</option>
                  <option value="Opias">Opias</option>
                  <option value="Ibabang Palale">Ibabang Palale</option>
                  <option value="Ilayang Palale">Ilayang Palale</option>
                  <option value="Kanlurang Palale">Kanlurang Palale</option>
                  <option value="Silangang Palale">Silangang Palale</option>
                  <option value="Pandakaki">Pandakaki</option>
                  <option value="Pook">Pook</option>
                  <option value="Potol">Potol</option>
                  <option value="San Diego Zone I (Poblacion)">San Diego Zone I (Poblacion)</option>
                  <option value="San Diego Zone II (Poblacion)">San Diego Zone II (Poblacion)</option>
                  <option value="San Diego Zone III">San Diego Zone III</option>
                  <option value="San Diego Zone IV">San Diego Zone IV</option>
                  <option value="San Isidro Zone I (Poblacion)">San Isidro Zone I (Poblacion)</option>
                  <option value="San Isidro Zone II">San Isidro Zone II</option>
                  <option value="San Isidro Zone III">San Isidro Zone III</option>
                  <option value="San Isidro Zone IV">San Isidro Zone IV</option>
                  <option value="San Roque Zone I (Poblacion)">San Roque Zone I (Poblacion)</option>
                  <option value="San Roque Zone II">San Roque Zone II</option>
                  <option value="Talolong">Talolong</option>
                  <option value="Tamlong">Tamlong</option>
                  <option value="Tongko">Tongko</option>
                  <option value="Valencia">Valencia</option>
                  <option value="Wakas">Wakas</option>
                </select>
                <label>BARANGAY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.municipality_city" required spellcheck="false" class="black-select">
                  <option value="Tayabas City">Tayabas City</option>
                </select>
                <label>MUNICIPALITY/CITY:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.province" required spellcheck="false" class="black-select">
                  <option value="Quezon Province">Quezon Province</option>
                </select>
                <label>PROVINCE:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.region" required spellcheck="false" class="black-select">
                  <option value="IV-A">IV-A</option>
                </select>
                <label>Region:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.mobile_number"
                  required
                  spellcheck="false"
                  maxlength="10"
                />
                <label>MOBILE NUMBER:</label>
              </div>
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
                <select v-model="farmer.religion" spellcheck="false" class="black-select" required>
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.religion && !['christianity', 'islam', 'Other'].includes(farmer.religion)" :value="farmer.religion">
                    {{ farmer.religion }}
                  </option>
                </select>
                <label>RELIGION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.religion && farmer.religion !== 'christianity'  && farmer.religion !== 'islam'" class="input-field">
                <input type="text" v-model="farmer.religion" spellcheck="false" />
                <label>Please specify your religion:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.civil_status" spellcheck="false" class="black-select" required>
                  <option value="single">single</option>
                  <option value="married">married</option>
                  <option value="widowed">widowed</option>
                  <option value="separated">separated</option>
                  <option value="Other">Other</option>
                  <option
                    v-if="farmer.civil_status && !['single', 'married', 'widowed', 'separated', 'Other'].includes(farmer.civil_status)"
                    :value="farmer.civil_status"
                  >
                    {{ farmer.civil_status }}
                  </option>
                </select>
                <label>CIVIL STATUS:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.civil_status === 'married'" class="input-field">
                <input type="text" v-model="farmer.name_of_spouse_if_married" spellcheck="false" />
                <label>NAME OF SPOUSE IF MARRIED:</label>
              </div>
              <div v-if="farmer.civil_status && farmer.civil_status !== 'single' && farmer.civil_status !== 'married'  && farmer.civil_status !== 'widowed'&& farmer.civil_status !== 'separated'" class="input-field">
                <input type="text" v-model="farmer.civil_status" spellcheck="false" />
                <label>Please specify your civil status:</label>
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
                <select v-model="farmer.household_heads" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.household_heads && !['yes', 'no'].includes(farmer.household_heads)" :value="farmer.household_heads">
                    {{ farmer.household_heads }}
                  </option>
                </select>
                <label>HOUSEHOLD HEADS:</label>
                <span class="arrow-down"></span>
              </div>
              
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_no_name_of_household_heads"
                  spellcheck="false"
                />
                <label>IF NO, NAME OF HOUSEHOLD HEADS:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.relationship"
                  spellcheck="false"
                />
                <label>RELATIONSHIP:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_living_household_members"
                  spellcheck="false"
                />
                <label>NO. OF LIVING HOUSEHOLD HEADS:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_male"
                  spellcheck="false"
                />
                <label>NO. OF MALE:</label>
              </div>
              <div v-if="showAdditionalInput" class="input-field">
                <input
                  type="text"
                  v-model="farmer.no_of_female"
                  spellcheck="false"
                />
                <label>NO. OF FEMALE:</label>
              </div>
              
              <div class="input-field">
                <select v-model="farmer.highest_formal_education" spellcheck="false" class="black-select" required>
                  <option value="pre-school">pre-school</option>
                  <option value="elementary">elementary</option>
                  <option value="high school (non K-12)">high school (non K-12)</option>
                  <option value="junior high school (K-12)">junior high school (K-12)</option>
                  <option value="senior high school (K-12)">senior high school (K-12)</option>
                  <option value="college">college</option>
                  <option value="vocational">vocational</option>
                  <option value="post-graduate">post-graduate</option>
                  <option value="none">none</option>
                  <option value="Other">Other</option>
                  <option v-if="farmer.highest_formal_education && !['pre-school', 'elementary','high school (non K-12)','junior high school (K-12)','senior high school (K-12)','college','vocational','post-graduate', 'Other'].includes(farmer.highest_formal_education)" :value="farmer.highest_formal_education">
                    {{ farmer.highest_formal_education }}
                  </option>
                </select>
                <label>HIGHEST FORMAL EDUCATION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="farmer.highest_formal_education && !['pre-school', 'elementary','high school (non K-12)','junior high school (K-12)','senior high school (K-12)','college','vocational','post-graduate','none' ].includes(farmer.highest_formal_education)" :value="farmer.highest_formal_education" class="input-field">
                <input type="text" v-model="farmer.highest_formal_education" spellcheck="false" />
                <label>Please specify your Highest Formal Educ:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.person_with_disability" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.person_with_disability && !['yes', 'no',].includes(farmer.person_with_disability)" :value="farmer.person_with_disability">
                    {{ farmer.person_with_disability }}
                  </option>
                </select>
                <label>PERSON WITH DISABILITY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.IVps_beneficiary" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.IVps_beneficiary && !['yes', 'no',].includes(farmer.IVps_beneficiary)" :value="farmer.IVps_beneficiary">
                    {{ farmer.IVps_beneficiary }}
                  </option>
                </select>
                <label>IVps BENEFICIARY:</label>
                <span class="arrow-down"></span>
              </div>
              <div class="input-field">
                <select v-model="farmer.member_of_an_indiginous_group" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.member_of_an_indiginous_group && !['yes', 'no',].includes(farmer.member_of_an_indiginous_group)" :value="farmer.member_of_an_indiginous_group">
                    {{ farmer.member_of_an_indiginous_group }}
                  </option>
                </select>
                <label>MEMBER OF INDIGINOUS GROUP:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputIndi" class="input-field">
                <input
                  type="text"
                  v-model="farmer.member_of_an_indiginous_group_if_yes_specify"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR INDIGINOUS GROUP:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.with_government_id" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.with_government_id && !['yes', 'no',].includes(farmer.with_government_id)" :value="farmer.with_government_id">
                    {{ farmer.with_government_id }}
                  </option>
                </select>
                <label>WITH GOVERNMENT ID:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputID" class="input-field">
                <input
                  type="text"
                  v-model="farmer.if_yes_specify_id_type"
                  spellcheck="false"
                />
                <label>SPECIFY YOUR ID:</label>
              </div>
              <div v-if="showAdditionalInputID" class="input-field">
                <input
                  type="text"
                  v-model="farmer.id_number"
                  spellcheck="false"
                />
                <label>ID NUMBER:</label>
              </div>
              <div class="input-field">
                <select v-model="farmer.member_of_any_farmers_association_cooperative" spellcheck="false" class="black-select" required>
                  <option value="yes">yes</option>
                  <option value="no">no</option>
                  <option v-if="farmer.member_of_any_farmers_association_cooperative && !['yes', 'no',].includes(farmer.member_of_any_farmers_association_cooperative)" :value="farmer.member_of_any_farmers_association_cooperative">
                    {{ farmer.member_of_any_farmers_association_cooperative }}
                  </option>
                </select>
                <label>MEMBER OF ANY FARMERS ASSOCIATION:</label>
                <span class="arrow-down"></span>
              </div>
              <div v-if="showAdditionalInputFarmerAsso" class="input-field">
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
                  required
                />
                <label>PERSON TO NOTIFY INCASE OF IMERGENCY:</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="farmer.contact_number"
                  spellcheck="false"
                  maxlength="10"
                  required
                />
                <label>CONTACT NUMBER:</label>
              </div>
            </div>
            <button class="next-button" style="display: block; margin: 0 auto;" @click="changeHover(2)">Next</button>
        </div>

        <div v-if="isHovered === 2" id="personalInfoIV" class="personal-info-section">
          <div class="row mb-3">
            <h1 style="color: black;">Main Livelihood</h1>
            <nav class="navbar">
            <div class="navbar-content">
              <div class="checkbox-group">
                <div class="checkbox-list">
                  <label v-for="option in livelihoodOptions" :key="option">
                    <input type="checkbox" :value="option" v-model="farmer.main_livelihood" />
                    {{ option }}
                  </label>
                </div>
              </div>
            </div>
          </nav>
        <div class="check-box">
          <label class="farming-activity-label">TYPE OF FARMING ACTIVITY:</label>
          <div v-for="activity in farmingActivityOptions" :key="activity">
            <label>
              <input 
                type="checkbox" 
                :value="activity" 
                v-model="farmer.type_of_farming_activity" 
              />
              {{ activity.replace('_', ' ').toLowerCase() }} 
            </label>
            
            <!-- Input box for "Other crops" -->
            <div v-if="activity === 'other_crop' && farmer.type_of_farming_activity.includes('other_crop')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.other_crop_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'livestock' && farmer.type_of_farming_activity.includes('livestock')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.livestock_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'poultry' && farmer.type_of_farming_activity.includes('poultry')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.poultry_specify" 
                placeholder="Please Specify" 
              />
            </div>
            <div v-if="activity === 'Other, please specify' && farmer.type_of_farming_activity.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherCrops" 
                v-model="farmer.type_of_farming_activities_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

        <div class="check-box">
          <label class="farming-activity-label">FOR FARMWORKERS:</label>
          <div v-for="task in farmworkerTaskOptions" :key="task">
            <label>
              <input 
                type="checkbox" 
                :value="task" 
                v-model="farmer.farmworkers_kind_of_work" 
              />
              {{ task.replace('_', ' ').toLowerCase() }}
            </label>
            <div v-if="task === 'Other, please specify' && farmer.farmworkers_kind_of_work.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherTask" 
                v-model="farmer.for_farmworkers_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

        <div class="check-box">
          <label class="farming-activity-label">FOR FISHERFOLK:</label>
          <div v-for="task in fishfolkTaskOptions" :key="task">
            <label>
              <input 
                type="checkbox" 
                :value="task" 
                v-model="farmer.for_fisherfolk" 
              />
              {{ task.replace('_', ' ').toLowerCase() }}
            </label>
            <div v-if="task === 'Other, please specify' && farmer.for_fisherfolk.includes('Other, please specify')" class="input-field2">
              <input 
                type="text" 
                id="otherFishfolkTask" 
                v-model="farmer.for_fishfolk_other" 
                placeholder="Please Specify" 
              />
            </div>
          </div>
        </div>

          <div class="check-box">
            <label class="farming-activity-label">AGRI YOUTH:</label>
            <div v-for="task in agriYouthTaskOptions" :key="task">
              <label>
                <input 
                  type="checkbox" 
                  :value="task" 
                  v-model="farmer.for_agri_youth" 
                />
                {{ task.replace('_', ' ').toLowerCase() }}
              </label>
              <div v-if="task === 'Other, please specify' && farmer.for_agri_youth.includes('Other, please specify')" class="input-field2">
                <input 
                  type="text" 
                  id="otherAgriYouthTask" 
                  v-model="farmer.for_agri_youth_other" 
                  placeholder="Please Specify" 
                />
              </div>
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

          </div>
          <div class="button-container">
          <button class="preview-button" @click="changeHover(1)">Preview</button>
          <button class="next-button" @click="changeHover(3)">Next</button>
        </div>
        </div>

        <div v-if="isHovered === 3" id="personalInfoIV" class="personal-info-section">
          <button type="button" @click="addFarmTable" class="add-farm-table-button">
            <i class="fas fa-plus"></i>
          </button>
          <div v-for="(parcel, index) in farmParcels" :key="index" class="table-container" style="color: black;">
            <div class="parcel-header">
              Farm Parcel {{ index + 1 }}
              <button type="button" class="remove-parcel-button" @click="removeFarmTable(index)">x</button>
            </div>
            <br>

            <!-- Parcel Row -->
            <div v-if="parcel.isPreview" class="row1">
              <div class="input-field">
                <input type="text" v-model="parcel.barangay" required spellcheck="false" />
                <label>Barangay:</label>
              </div>

              <div class="input-field">
                <input type="text" v-model="parcel.city_municipality" required spellcheck="false" />
                <label>City/Municipality:</label>
              </div>

              <div class="input-field">
                <input type="text" v-model="parcel.total_farm_area_ha" required spellcheck="false" />
                <label>Total Farm Area:</label>
              </div>

              <div class="input-field">
                <input type="text" v-model="parcel.ownership_document_no" required spellcheck="false" />
                <label>Ownership Document:</label>
              </div>

              <div class="input-field">
                <select v-model="parcel.with_ancestral_domain" required spellcheck="false" class="black-select">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label>With Ancestral Domain:</label>
                <span class="arrow-down"></span>
              </div>

              <div class="input-field">
                <select v-model="parcel.agrarian_reform_beneficiary" required spellcheck="false" class="black-select">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label>Agrarian Reform Beneficiary:</label>
                <span class="arrow-down"></span>
              </div>

              <div class="input-field">
                <select v-model="parcel.ownership_type" required spellcheck="false" class="black-select">
                  <option value="registered owner">registered owner</option>
                  <option value="other">other</option>
                </select>
                <label>Ownership Type:</label>
                <span class="arrow-down"></span>
              </div>

              <div class="input-field">
                <input type="text" v-model="parcel.tenant" required spellcheck="false" />
                <label>Tenant:</label>
              </div>

              <div class="input-field">
                <input type="text" v-model="parcel.lessee" required spellcheck="false" />
                <label>Lessee:</label>
              </div>
            </div>

            <div v-if="!parcel.isPreview" class="row">
              <!-- Loop through each table for "Crop/Livestock" and "Area Size" -->
              <div v-for="(table, tableIndex) in parcel.tables" :key="tableIndex" class="row">
                <div class="input-field">
                  <select v-model="table.category" required spellcheck="false" class="black-select">
                    <option value="Crop Commodity">Crop Commodity</option>
                    <option value="Livestock">Livestock</option>
                  </select>
                  <label>Category ({{ tableIndex + 1 }}):</label>
                  <span class="arrow-down"></span>
                </div>

                <div v-if="table.category === 'Crop Commodity' || table.category === 'Livestock'" class="input-field">
                  <input type="text" v-model="table.crop_livestock" required spellcheck="false" />
                  <label>Crop/Livestock ({{ tableIndex + 1 }}):</label>
                </div>

                <div class="input-field" v-if="table.category === 'Crop Commodity'">
                  <input type="text" v-model="table.size" required spellcheck="false" />
                  <label>Size ({{ tableIndex + 1 }}):</label>
                </div>

                <div class="input-field" v-if="table.category === 'Livestock'">
                  <input type="text" v-model="table.no_of_heads" required spellcheck="false" />
                  <label>No of Heads ({{ tableIndex + 1 }}):</label>
                </div>

                <div class="input-field">
                  <select v-model="table.farm_type" required spellcheck="false" class="black-select">
                    <option value="(1)Irrigated">(1)Irrigated</option>
                    <option value="(2)Rainfed Upland">(2)Rainfed Upland</option>
                    <option value="(3)Rainfed Lowland">(3)Rainfed Lowland</option>
                  </select>
                  <label>Farm Type ({{ tableIndex + 1 }}):</label>
                  <span class="arrow-down"></span>
                </div>

                <div class="input-field">
                  <select v-model="table.organic_practitioner" required spellcheck="false" class="black-select">
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                  </select>
                  <label>Organic Practitioner ({{ tableIndex + 1 }}):</label>
                  <span class="arrow-down"></span>
                </div>

                <div class="input-field">
                  <input type="text" v-model="table.remarks" required spellcheck="false" />
                  <label>Remarks ({{ tableIndex + 1 }}):</label>
                </div>
              </div>
            </div>

            <div v-if="!parcel.isPreview" class="actions right-align">
              <button type="button" @click="previewParcel(index)">Preview</button>
              <button type="button" @click="addInputBox(index)">Add Parcel Table</button>
            </div>

            <div v-if="parcel.isPreview" class="actions right-align">
              <button type="button" @click="nextParcel(index)">Next</button>
            </div>
          </div>

          <div class="button-container">
            <button class="preview1-button" @click="changeHover(2)">Preview</button>
            <button type="submit" class="submit-button" @click="submitForm">Update</button>
          </div>
        </div>
        <div v-if="alertMessage" class="alert-box">
          <i class="fa-regular fa-circle-check fa-5x" style="color: #63E6BE;"></i>
          <h1>Success</h1>
          <p>{{ alertMessage }}</p>
          <button @click="closeAlert">Ok</button>
        </div>
      </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'; 
import { useRouter, useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const isHovered = ref(1);
const alertMessage = ref(''); 
const farmerId = route.params.id;
const farmParcels = ref([]);
const clickCount = ref(0);

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
  household_heads: 'no',
  if_no_name_of_household_heads: '',
  relationship: '',
  no_of_living_household_members: '',
  no_of_male: '',
  no_of_female: '',
  highest_formal_education: '',
  person_with_disability: '',
  IVps_beneficiary: '',
  member_of_an_indiginous_group: 'no',
  member_of_an_indiginous_group_if_yes_specify: '',
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

const showAdditionalInput = ref(false);
const showAdditionalInputIndi = ref(false);
const showAdditionalInputID = ref(false);
const showAdditionalInputFarmerAsso = ref(false);

watch(
  () => ({
    householdHeads: farmer.value.household_heads,
    indigenousGroup: farmer.value.member_of_an_indiginous_group,
    governmentID: farmer.value.with_government_id,
    farmersAssociation: farmer.value.member_of_any_farmers_association_cooperative
  }),
  ({ householdHeads, indigenousGroup, governmentID, farmersAssociation }) => {
    showAdditionalInput.value = householdHeads === 'yes';
    showAdditionalInputIndi.value = indigenousGroup === 'yes';
    showAdditionalInputID.value = governmentID === 'yes';
    showAdditionalInputFarmerAsso.value = farmersAssociation === 'yes';
  },
  { immediate: true }
);

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
  'Other, please specify',
];
const farmworkerTaskOptions = [
  'land preparation',
  'planting / transplanting',
  'cultivation',
  'harvesting',
  'Other, please specify'
];
const fishfolkTaskOptions = [
  'fish capture',
  'aquaculture',
  'gleaning',
  'fish processing',
  'fish vending',
  'Other, please specify'
];
const agriYouthTaskOptions = [
  'part of a farming household',
  'attending attended formal agri fishery related course',
  'attending attended non formal agri fishery related course',
  'participated in any agricultural activity program',
  'Other, please specify'
];

const fetchFarmerDetails = async () => {
  try {
    const farmerId = route.params.id; 
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

    Object.assign(farmer.value, response.data.data);
    // Fetch parcels
    const parcelsResponse = await axios.get(`http://localhost:8055/items/parcel?filter[farmer_id][_eq]=${farmerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // For each parcel, fetch its associated tables
    const parcelsWithTables = await Promise.all(
      parcelsResponse.data.data.map(async (parcel) => {
        const tablesResponse = await axios.get(
          `http://localhost:8055/items/parcel_table?filter[farmer_table_id][_eq]=${farmerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return {
          ...parcel,
          isPreview: true,
          tables: tablesResponse.data.data || [],
          parcel_id: parcel.id, // Store the original parcel ID
        };
      })
    );

    farmParcels.value = parcelsWithTables;
  } catch (error) {
    console.error('Error fetching farmer details:', error.response ? error.response.data : error.message);
    alert('An error occurred while fetching the farmer details.');
  }
};

onMounted(() => {
  fetchFarmerDetails();
});
const addFarmTable = () => {
  farmParcels.value.push({
    farmer_id: farmerId,
    barangay: '',
    city_municipality: '',
    total_farm_area_ha: '',
    ownership_document_no: '',
    with_ancestral_domain: '',
    agrarian_reform_beneficiary: '',
    ownership_type: '',
    tenant: '',
    lessee: '',
    isPreview: true,
    tables: [],
  });
  clickCount.value++;
};

const removeFarmTable = (index) => {
  farmParcels.value.splice(index, 1);
  if (clickCount.value > 0) {
    clickCount.value--;
  }
};

const nextParcel = (index) => {
  farmParcels.value[index].isPreview = false;
};

const previewParcel = (index) => {
  farmParcels.value[index].isPreview = true;
};

const addInputBox = (parcelIndex) => {
  farmParcels.value[parcelIndex].tables.push({
    farmer_table_id: farmerId,
    crop_livestock: '',
    category: '',
    size: '',
    no_of_heads: '',
    farm_type: '',
    organic_practitioner: '',
    remarks: '',
  });
};
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

    const unreadCount = parseInt(localStorage.getItem('unread_notifications')) || 0;
    localStorage.setItem('unread_notifications', unreadCount + 1);
    
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
const submitForm = async () => {
  try {
    const farmerId = route.params.id; // Farmer ID from route
    const token = localStorage.getItem('auth_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      alert('No authentication token or email found. Please log in again.');
      return;
    }

    let response;
    try {
      response = await axios.patch(`http://localhost:8055/items/farmers/${farmerId}`, farmer.value, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      // Update existing parcels and create new ones
    const parcelPromises = farmParcels.value.map(async (parcel) => {
      const { tables, isPreview, ...parcelData } = parcel;
      
      if (parcel.parcel_id) {
        // Update existing parcel
        await axios.patch(`http://localhost:8055/items/parcel/${parcel.parcel_id}`, parcelData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Create new parcel
        const response = await axios.post('http://localhost:8055/items/parcel', parcelData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        parcel.parcel_id = response.data.data.id;
      }
    });

    // Update existing tables and create new ones
    const tablePromises = farmParcels.value.flatMap(parcel =>
      parcel.tables.map(async (table) => {
        if (table.id) {
          // Update existing table
          await axios.patch(`http://localhost:8055/items/parcel_table/${table.id}`, table, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        } else {
          // Create new table
          await axios.post('http://localhost:8055/items/parcel_table', {
            ...table,
            farmer_table_id: farmerId,
            parcel_id: parcel.parcel_id,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
      })
    );

    await Promise.all([...parcelPromises, ...tablePromises]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const refreshResponse = await axios.post('http://localhost:8055/auth/refresh', {
          refresh_token: refreshToken,
        });

        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data.data.access_token;
          const newRefreshToken = refreshResponse.data.data.refresh_token;

          localStorage.setItem('auth_token', newAccessToken);
          localStorage.setItem('refresh_token', newRefreshToken);

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
        console.error('Error updating farmer:', error.response ? error.response.data : error.message);
        alert('An error occurred while updating the farmer.');
        return;
      }
    }

    logActivity(email, `Updated farmer with reference number: ${farmer.value.reference_number}`);

    alertMessage.value = 'Farmer Updated Successfully!';

    setTimeout(() => {
    }, 2000);
  } catch (error) {
    console.error('Error updating farmer:', error.response ? error.response.data : error.message);
    alert('An error occurred while updating the farmer.');
  }
};

    const closeAlert = () => {
      alertMessage.value = ''; 
      router.push('/farmers/index'); 
    };

    const changeHover = (index) => {
  isHovered.value = index; 
};
</script>

<style scoped>
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
  overflow-y: auto; 
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
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer; 
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: darkgreen;
}
.farm-location-input {
    width: 450px;
    display: block;
    margin: 5px auto 5px auto;
    height: 35px;
}

.farm-location-input2 {
    width: 245px;
    height: 35px;
}
.ha {
    width: 70px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 80px; 
}
.input-field2 input {
    width: 210px;
    height: auto;
    font-size: 15px;
    padding: 5px 0;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    color: black;
    outline: none; 
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.3s ease; 
}
select:focus ~ label,
select:valid ~ label {
    top: 0;
    left: 15px;
    font-size: 14px;
    padding: 0 2px;
    background: #f2f4f7;
    }
    input:focus {
    outline: none; 
    box-shadow: 0 0 5px #f8f9fa;
}
input:focus ~ label,
input:valid ~ label {
  top: 0;
  left: 15px;
  font-size: 14px;
  padding: 0 2px;
  background: #f2f4f7;
}
.add-farm-table-button {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
  position: absolute;
  right: 50px;
  top: 17.5%;
}

.add-farm-table-button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}
.container {
  position: relative;
}
.table-container {
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #aaa;
  background-color: #f9f9f9;
}
.parcel-info {
  margin-top: 5px;
}
.remove-parcel-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  width: 20px; /* Set width for the circle */
  height: 20px; /* Set height for the circle */
  display: inline-flex; /* Center content */
  align-items: center; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  cursor: pointer;
  border-radius: 50%; /* Make it circular */
}

.remove-parcel-button:hover {
  background-color: #d93636;
}
.right-align {
    display: flex;
    justify-content: flex-end;
    padding-right: 15px; /* Adjust this value as needed */
}

.actions button {
    padding: 10px 20px;  /* You can adjust this padding */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
}

.actions button:hover {
    background-color: #0056b3;
}
.button-container {
  display: flex;
  justify-content: center; 
  gap: 10px; 
  margin-top: 20px;
}

.next-button {
  background-color: #387e90;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.preview-button {
  background-color: #888888;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.preview1-button {
  background-color: #888888;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 30%;
}
.input-field2 input {
    width: 210px;
    height: auto;
    font-size: 15px;
    padding: 5px 0;
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    color: black;
    outline: none; 
    appearance: none; 
    -webkit-appearance: none; 
    transition: border-color 0.3s ease;
}

.top-section {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.info-box h1 {
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
}
.info-box h2 {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-transform: capitalize;
}
</style>
