require 'test_helper'

class EnchantsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @enchant = enchants(:one)
  end

  test "should get index" do
    get enchants_url
    assert_response :success
  end

  test "should get new" do
    get new_enchant_url
    assert_response :success
  end

  test "should create enchant" do
    assert_difference('Enchant.count') do
      post enchants_url, params: { enchant: {  } }
    end

    assert_redirected_to enchant_url(Enchant.last)
  end

  test "should show enchant" do
    get enchant_url(@enchant)
    assert_response :success
  end

  test "should get edit" do
    get edit_enchant_url(@enchant)
    assert_response :success
  end

  test "should update enchant" do
    patch enchant_url(@enchant), params: { enchant: {  } }
    assert_redirected_to enchant_url(@enchant)
  end

  test "should destroy enchant" do
    assert_difference('Enchant.count', -1) do
      delete enchant_url(@enchant)
    end

    assert_redirected_to enchants_url
  end
end
