module.exports = {
  getProducts: 'SELECT * FROM ti_team8.Item',
  getCategories: 'SELECT * FROM ti_team8.Category',
  getEmployee: `SELECT
    user.phone,
    user.FirstName,
    user.LastName,
    user.Email,
    user.RoleId,
    role.RoleName
FROM
    User AS user,
    Role AS role
WHERE
    role.RoleId = user.RoleId
        AND user.RoleId != 3`,
  deleteUserRole: 'update User SET RoleId = 3 where Email = ? and RoleId = ?',
  addUserRole: 'update User SET RoleId = ? where FirstName = ?',
  getOrders:
    "SELECT orderId,Email,DATE_FORMAT(Order.OrderDate,'%M %d %Y') as 'OrderDate',DATE_FORMAT(Order.DeliveredDate,'%M %d %Y') as 'DeliveredDate',UCASE(Status) as 'Status',DATE_FORMAT(Order.PickUpSlot,'%M %d %Y, %h:%m:%S %p') as PickUpSlot FROM ti_team8.Order;", //need to update with bannerId in where clause
  getOrdersByBannerId:
    "SELECT orderId,Email,DATE_FORMAT(Order.OrderDate,'%M %d %Y') as 'OrderDate',DATE_FORMAT(Order.DeliveredDate,'%M %d %Y') as 'DeliveredDate',UCASE(Status) as 'Status',DATE_FORMAT(Order.PickUpSlot,'%M %d %Y, %h:%m:%S %p') as PickUpSlot FROM ti_team8.Order where Email=?;", //need to update with bannerId in where clause
  getOrder:
    'SELECT Order.OrderId,Item.ItemName,OrderDetails.ItemQuantity,Order.OrderDate,Order.DeliveredDate,Order.status,Order.PickUpSlot,Category.CategoryName,OrderDetails.ItemId FROM ti_team8.OrderDetails,ti_team8.Order,ti_team8.Item,ti_team8.Category where Order.OrderId=OrderDetails.OrderId and OrderDetails.ItemId=Item.ItemId and Item.CategoryId=Category.CategoryId and Order.OrderId=?;',
  deletecart: 'DELETE FROM ti_team8.Cart where Email=?',
  orderStatusUpdate: 'UPDATE `ti_team8`.`Order` SET `Status` = ? WHERE `OrderId` = ?;',
  setOrderDeliveredDate: 'UPDATE `ti_team8`.`Order` SET `DeliveredDate` = current_date() WHERE `OrderId` = ?;',
  getCategories: 'SELECT * FROM ti_team8.Category',
  createUser: 'INSERT INTO ti_team8.User(Phone,FirstName,LastName,Password,Email,RoleId) VALUES (?,?,?,?,?,?)',
  getRoles: 'SELECT * FROM ti_team8.Role',
  resetPassword: `UPDATE ti_team8.User SET token=? WHERE User.Email = ?;`,
  removeToken: `UPDATE ti_team8.User SET token=null WHERE User.Email = ?;`,
  getResetToken: `SELECT token FROM ti_team8.User WHERE User.Email = ?;`,
  updatePassword: `UPDATE ti_team8.User SET Password=? WHERE User.Email = ?;`,

  createProduct:
    'INSERT INTO `ti_team8`.`Item` (`ItemName`,`ItemDescription`,`CategoryId`,`AvailableQuantity`,`ItemLimit`) VALUES (?,?,?,?,?);',
  updateProduct:
    'UPDATE `ti_team8`.`Item` SET `ItemName` = ?,`ItemDescription` = ?,`CategoryId` = ?,`AvailableQuantity` = ?,`ItemLimit` = ? WHERE `ItemId` = ?;',
  createOrder: `INSERT INTO ti_team8.Order (Email,OrderDate,Status,PickUpSlot) VALUES (?,?,?,?)`,
  createOrderdetails: `INSERT INTO ti_team8.OrderDetails (OrderId,ItemId,ItemQuantity) VALUES (?,?,?)`,
  fetchOrderId: `SELECT OrderId FROM ti_team8.Order where Email= ? ORDER BY OrderId DESC LIMIT 1;`,
  getProducts: `SELECT *
    FROM
    ti_team8.Item as I
      LEFT JOIN
    ti_team8.Category as C
    ON I.CategoryId = C.CategoryId
    ORDER BY I.ItemId`,
  addCategory: 'INSERT INTO `ti_team8`.`Category` (`CategoryName`) VALUES (?);',
  updateCategory: 'UPDATE `ti_team8`.`Category` SET `CategoryName` = ? WHERE `CategoryId` = ?;',
  getProductById: `SELECT *
    FROM
    ti_team8.Item as I
      LEFT JOIN
    ti_team8.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemId = ?`,
  getProductsByName: `SELECT *
    FROM
    ti_team8.Item as I
      LEFT JOIN
    ti_team8.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemName LIKE ?
    ORDER BY I.ItemId`,
  getProductsByCategory: `SELECT *
    FROM
    ti_team8.Item as I
      LEFT JOIN
    ti_team8.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE I.CategoryId IN (`,
  getProductsByNameAndCategory: `SELECT *
    FROM
    ti_team8.Item as I
      LEFT JOIN
    ti_team8.Category as C
    ON I.CategoryId = C.CategoryId
    WHERE ItemName LIKE ? AND I.CategoryId IN (`,
  deleteProduct: `DELETE FROM ti_team8.Item WHERE ItemId = ?;`,
  //signIn: '',
  getRole: 'SELECT * FROM ti_team8.Role',
  getStudent: 'select * from User where RoleId = 3',
  signIn: `SELECT * from ti_team8.User where Email = ? ;`,
  getCartProducts: `SELECT *
    FROM ti_team8.Cart as C LEFT JOIN ti_team8.Item as I
    ON C.ItemId = I.ItemId
    LEFT JOIN ti_team8.Category as Ca
    ON I.CategoryId = Ca.CategoryId
    where C.email= ? AND C.Status='false'`,
  addProductToCart: `INSERT INTO ti_team8.Cart Values (?, ?, ?, ?)`,
  deleteProductFromCart: `DELETE FROM ti_team8.Cart WHERE ItemId = ? AND Email = ? AND Status = 'true'`,
  isProductAvailableInCart: `SELECT * FROM ti_team8.Cart WHERE ItemId = ? AND Email = ? AND Status = 'true'`,
  postContactUsMessage: `insert into ContactUs (FirstName, Email, Message) values( ?, ?, ?)`,
  getUser: `SELECT * FROM ti_team8.User where Email = ?`,
  updateUser: `UPDATE ti_team8.User
    SET FirstName = ?, LastName = ?, Email = ?
    WHERE Email = ?`,

  //Donations

  getDonations: `select * from ti_team8.Donation`,
  getDonation: `select * from ti_team8.Donation where DonationId=?`,
  insertDonation: `insert into ti_team8.Donation (Phone,Name,Addressline1,Addressline2, ZipCode, PickUpSlot) VALUES (?,?,?,?,?,?)`,
};
