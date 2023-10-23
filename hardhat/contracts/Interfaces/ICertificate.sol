// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

interface ICertificate {
  enum Role_Access {
    Normal_User,
    Student,
    ThirdPartyValidator,
    University,
    Admin
  }
  struct User {
    address userId;
    Role_Access role_assigned;
    string universityName;
    bool isValid;
  }
  struct CertificateDetail {
    address owner;
    address issuer;
    string documentUrl;
    string uniqueId;
    string courseId;
    string remarks;
    bool isValid;
  }

  /**
   *
   * @param _user is address which has to give new/modify role, given only admin
   * @param _newRole is role which is used to access certain functions
   */
  function modifyRole(address _user, Role_Access _newRole) external;

  function generateApiKey(
    address _user,
    string memory _universityName,
    Role_Access _role
  ) external;

  function verifyApiKey(string memory apiKey) external view returns (address);

  /**
   * this function is used to generate certificate, can only be called by university or admin
   * @param _owner owner of certificate
   * @param _documentUrl certificate (https://...)
   * @param _uniqueId id of certificate
   * @param _courseId it is id for diffiernt course assigned by university
   * @param _remark measure or performance of student
   */
  function generateCertificate(
    address _owner,
    string memory _documentUrl,
    string memory _uniqueId,
    string memory _courseId,
    string memory _remark
  ) external;

  /**
   * used to get certificate
   * @param _certId it is used to get particular certificate
   */
  function getCertificateDetail(
    string memory _certId
  ) external view returns (CertificateDetail memory);

  function getAllMyCertificates()
    external
    view
    returns (CertificateDetail[] memory);

  /**
   * this function is only used by ThirdPartyValidator to validate certificate
   * it will emit certificate detail if the certificate is "Valid"
   * @param _certId it is used to get particular certificate
   */
  function validateCertificate(string memory _certId) external returns (bool);

  /**
   * this function is used to "invalid" a particular certificate
   * @param _student address of certificate/s owner
   * @param _certId it is used to get particular certificate
   */
  function discardCertficate(address _student, string memory _certId) external;

  /**
   * gets owner of this contract / first admin
   */
  function getOwner() external view returns (address);

  /**
   * gets what permission the user has
   * @param _user address of user
   */
  function getUserPermission(address _user) external view returns (Role_Access);

  /**
   *
   * @param _user this is it
   */
  function getUserDetail(address _user) external view returns (User memory);

  function getApiKeys(address _user) external view returns (string memory);

  /**
   * give the issuer of certifficate
   * @param _certId it is used to get particular certificate
   */
  function getCertificateIssuer(
    string memory _certId
  ) external view returns (address);
}
