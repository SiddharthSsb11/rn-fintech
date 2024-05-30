import styles from "./Dropdown.styles";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons/build/Icons";

const Dropdown = ({ icon, text, menuItems }) => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  const [buttonLayout, setButtonLayout] = useState(null);

  const handlePress = () => {
    buttonRef.current.measure((fx, fy, width, height, px, py) => {
      setButtonLayout({ fx, fy, width, height, px, py });
      setVisible(true);
    });
  };

  const handleSelect = (item) => {
    setVisible(false);
    item.onPress();
  };

  const { width: screenWidth } = Dimensions.get("window");

  const getMenuStyle = () => {
    if (!buttonLayout) return {};

    const menuWidth = 200;
    let left = buttonLayout.px;
    let top = buttonLayout.py - 164;

    // dropdown does not go off the right side of the screen
    if (left + menuWidth > screenWidth) {
      left = screenWidth - menuWidth - 64;
    }

    //dropdown does not go off the top side of the screen
    if (top < 0) {
      top = 10;
    }

    return {
      position: "absolute",
      top: buttonLayout.py + buttonLayout.height,
      left,
      // top,
    };
  };

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        style={styles.container}
        onPress={handlePress}
      >
        <View style={styles.circle}>
          <Ionicons name={icon} size={30} color={Colors.dark} />
        </View>
        <Text style={styles.label}>{text}</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        animationType="none"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            {buttonLayout && (
              <View style={[styles.menu, getMenuStyle()]}>
                {menuItems.map((item, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => handleSelect(item)}
                    >
                      <Text style={styles.menuItemText}>{item.label}</Text>

                      <MaterialIcons
                        name={item.icon}
                        size={24}
                        color={Colors.dark}
                      />
                    </TouchableOpacity>
                    {index < menuItems.length - 1 && (
                      <View
                        style={{
                          flex: 1,
                          height: StyleSheet.hairlineWidth,
                          backgroundColor: Colors.gray,
                        }}
                      />
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Dropdown;
