/**
 * configConstants
 *
 * @subpackage             Config Constants
 * @category               Constants
 * @DateOfCreation         06 Dec 2018
 * @ShortDescription       This is responsible for Config Constants action names
 */
export const configConstants = {
    
    API_BASE_PATH       : 'https://api.avark.in:4433',
    API_BASE_PATH_Slash : 'https://api.avark.in:4433/',
    // API_BASE_PATH       : 'http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100',
    // API_BASE_PATH_Slash : 'http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100/',
    // PAYMENT_KEY         : 'rzp_test_RDnu2TcVERtW5a',
    PAYMENT_KEY         : 'rzp_live_A1mK7jIUq3RSvs',
    SUCCESS_CODE        :  200,
    ERROR_CODE          :  500,
    EXCEPTION_CODE      :  400,
    UNAUTHENTICATE_CODE :  401,
    LOGIN_TOKEN         : 'token',
    USER_ID             : 'user_id',
    USER_INFO           : 'user_info',
    AUTHENTICATE        : 'authenticate',
    USER_FULL_INFO      : 'info',
    SERVER_DOWN         : 'SERVER_DOWN'
};
