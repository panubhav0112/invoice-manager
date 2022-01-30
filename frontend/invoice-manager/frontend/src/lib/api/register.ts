import axios from 'axios';
import { notifyFail, notifySuccess } from '../../Pages/ClientPage';
import { ClientDetails } from '../../types/client_details';

const registration = async (clientDetails: ClientDetails, setLoading: any) => {
  try {
    axios
      .post('http://localhost:5000/api/client/newClient', {
        companyName: clientDetails.companyName,
        shortName: clientDetails.shortName,
        companyType: clientDetails.companyType,
        gstNumber: clientDetails.gstNumber,
        defaultCurrency: clientDetails.defaultCurrency,
        cin: clientDetails.cin,
        gstPercentage: clientDetails.gstPercentage,
        yearsOfIncorporation: clientDetails.yearsOfIncorporation,
        address: clientDetails.address,
        pinCode: clientDetails.pinCode,
        city: clientDetails.city,
        state: clientDetails.state,
        country: clientDetails.country,
        cgstPercentage: clientDetails.cgstPercentage,
        sgstPercentage: clientDetails.sgstPercentage,
        igstPercentage: clientDetails.igstPercentage,
      })
      .then((response) => {
        setLoading(false);
        notifySuccess('Registered Successfully');
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response) {
          notifyFail(error.response.data.message);
        } else if (error.request) {
          notifyFail(error.request);
        } else {
          notifyFail(error.message);
        }
        notifyFail(error.config);
      });
  } catch (error: any) {
    notifyFail(error);
  }
};

export default registration;
