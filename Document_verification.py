def name_in_file(name_to_search):
    with open("recognized.txt", 'r') as read_obj:
        for line in read_obj:
            if name_to_search in line:
                return True
    return False
def amount_in_file(amount_to_search):
    with open("recognized.txt", 'r') as read_obj:
        for line in read_obj:
            if amount_to_search in line:
                return True
    return False
import cv2
import pytesseract
name_entered="Name"
amount_needed="Insurance_amount"
bill_amount="Bill_amount"
pytesseract.pytesseract.tesseract_cmd = "Path_for_tesseract.exe"
img = cv2.imread("Image_of_the_Bill")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))
dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)
contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL, 
                                                 cv2.CHAIN_APPROX_NONE)
im2 = img.copy()
file = open("recognized.txt", "w+")
file.write("")
file.close()
for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    rect = cv2.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)
    cropped = im2[y:y + h, x:x + w]
    file = open("recognized.txt", "a")
    text = pytesseract.image_to_string(cropped)
    file.write(text.upper())
    file.write("\n")
    file.close
n=name_in_file(name_entered.upper())
a=amount_in_file(bill_amount)
if(amount_needed<bill_amount and n is True and a is True):
    print("Documents Verified")
else:
    print("Documents doesn't match")
