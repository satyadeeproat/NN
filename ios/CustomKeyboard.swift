import Foundation
import React
import UIKit

@objc(CustomKeyboard)
class CustomKeyboard: RCTEventEmitter {
  var stackView: UIStackView!

  override init() {
    super.init()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  /*
     Create a randomized array of length 12, with last digit as X and second last digit as .
   */
  @objc
  func getRandomizedArray() -> [String] {
    let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    let specialChars = [".", "X"]
    var buttonTitles = numbers

    buttonTitles.shuffle()
    buttonTitles.insert(specialChars[0], at: buttonTitles.count - 1)
    buttonTitles.append(specialChars[1])
    return buttonTitles
  }

  @objc
  func showKeyboard() {
    DispatchQueue.main.async {
      guard let viewController = UIApplication.shared.windows.first?.rootViewController else {
        return
      }

      if self.stackView != nil {
        self.stackView.removeFromSuperview()
      }

      self.stackView = UIStackView()
      let buttonTitles = self.getRandomizedArray()

      self.stackView.axis = .vertical
      self.stackView.alignment = .fill
      self.stackView.distribution = .fillEqually

      for rowIndex in 0..<4 {
        let rowStackView = UIStackView()
        rowStackView.axis = .horizontal
        rowStackView.distribution = .fillEqually

        for colIndex in 0..<3 {
          let index = rowIndex * 3 + colIndex
          if index >= buttonTitles.count {
            break
          }
          let button = UIButton(type: .system)
          if buttonTitles[index] == "X" {
            button.setTitle(backspaceUnicode, for: .normal)
            button.titleLabel?.font = UIFont(name: "Material Icons", size: 30)
          } else {
            button.setTitle(buttonTitles[index], for: .normal)
            button.titleLabel?.font = UIFont.systemFont(ofSize: 30)
          }
          button.setTitleColor(.white, for: .normal)
          button.backgroundColor = .lightGray
          button.layer.borderWidth = 1.0
          button.layer.borderColor = UIColor.black.cgColor
          button.addTarget(self, action: #selector(self.buttonTapped(_:)), for: .touchUpInside)

          rowStackView.addArrangedSubview(button)
        }

        self.stackView.addArrangedSubview(rowStackView)
      }

      viewController.view.addSubview(self.stackView)
      self.stackView.translatesAutoresizingMaskIntoConstraints = false

      NSLayoutConstraint.activate([
        self.stackView.leadingAnchor.constraint(equalTo: viewController.view.leadingAnchor),
        self.stackView.trailingAnchor.constraint(equalTo: viewController.view.trailingAnchor),
        self.stackView.bottomAnchor.constraint(
          equalTo: viewController.view.safeAreaLayoutGuide.bottomAnchor),
      ])
    }
  }

  @objc
  func hideKeyboard() {
    DispatchQueue.main.async {
      self.stackView.removeFromSuperview()
    }
  }

  @objc override func supportedEvents() -> [String]! {
    return ["ButtonPressEvent"]
  }

  @objc func buttonTapped(_ sender: UIButton) {
    let title = sender.title(for: .normal)
    if title == nil {
      return
    }
    let event: [String: Any] = ["buttonTitle": title == backspaceUnicode ? "X" : title!]
    sendEvent(withName: "ButtonPressEvent", body: event)
  }
}
